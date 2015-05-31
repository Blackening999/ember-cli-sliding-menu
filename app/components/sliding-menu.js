import Ember from 'ember';
import Movement from 'app/utils/movement';

/**
 * Sliding menu
 */
export default Ember.Component.extend({
  /**
   * Default options
   */
  classNameBindings: ['slidingElement'],

  //Custom sliding menu class
  slidingElement: function() {
    return this.get('slidingElementClass') || 'sliding-menu';
  }.property(),
  //Movement instance
  movement: null,
  //Hammer instance
  hammer: null,
  //jQuery instance of sliding element
  $slidingComponent: '',
  //Default application identifier
  appIdentifier: '.app',
  //Menu Progress manager
  menuProgressService: null,
  menuProgress: Ember.computed.alias('menuProgressService.menuProgress'),
  //initial offset
  offset: 0,
  //Slide direction option
  slideDirection: 'toLeft',
  //Tappable/Pannable zone where animation will invoke
  pannableWidth: 40,
  //Default animation speed
  defaultSpeed: 0.03,

  initElement: function() {
    this.width = this.element.offsetWidth;

    var appElement = document.querySelector(this.get('appIdentifier')),
      hammer = new Hammer(appElement),
      slidingElement = this.get('slidingElement'),
      direction = this.get('slideDirection'),
      initialWidth = direction === 'toLeft' ? this.width : -Math.abs(this.width);

    this.setProperties({
      hammer: hammer,
      screenWidth: appElement.offsetWidth,
      $slidingComponent: Ember.$('.' + (slidingElement === '' ?  this.get('observableElement') : slidingElement))
    });

    this.get('$slidingComponent').css({ transform: 'translateX(' + initialWidth + 'px)' });
    this.get('hammer').on('panstart', this.handlePanStart.bind(this));

  }.on('didInsertElement'),

  deInitElement: function() {
    this.get('hammer').destroy();
    this.menuProgressService.updateProgress(0);
  }.on('willDestroyElement'),

  /**
   * Pan start Handler
   * @param event
   */
  handlePanStart: function(event) {
    event.preventDefault();

    var movement = new Movement(event), newOffset = 0, progress = this.get('menuProgress');
    this.movement = movement;

    if (this.get('slideDirection') === 'toLeft') {
      if (progress === -1 || movement.initX >= this.get('screenWidth') - this.get('pannableWidth')) {
        newOffset = progress === 0 ? Math.abs(this.width - movement.initX) : movement.initX;
        this.offset = Math.max(0, newOffset);
        this.attachHandlers();
      }
    } else if (this.get('slideDirection') === 'toRight') {
      if (progress === 1 || movement.initX <= this.get('pannableWidth')) {
        newOffset = progress * this.width - movement.initX;
        this.offset = Math.max(0, newOffset);
        this.attachHandlers();
      }
    }
    return false;
  },
  /**
   * Pan move Handler
   * @param event
   */
  handlePanMove: function(event) {
    event.preventDefault();

    this.movement.push(event);
    if (!this.tick) {
      this.tick = true;
      requestAnimationFrame(this.updateElementProgress.bind(this));
    }
    return false;
  },
  /**
   * Pan end Handler
   * @param event
   */
  handlePanEnd: function(event) {
    event.preventDefault();

    this.get('hammer').off('panmove', this.handlePanMove);
    this.get('hammer').off('panend', this.handlePanEnd);
    this.completeExpansion();
    return false;
  },

  attachHandlers: function() {
    this.get('$slidingComponent').css({ visibility: 'visible' });
    this.get('hammer').on('panmove', this.handlePanMove.bind(this));
    this.get('hammer').on('panend', this.handlePanEnd.bind(this));
  },

  /**
   * Rendering observer with constraints
   */
  animateSliding: function() {
    var progress = this.get('menuProgress'),
      translatedProgress = this.get('slideDirection') === 'toLeft' ? progress + 1 : progress - 1;

    if (this.element && this.width) {
      var translate = translatedProgress * this.width;
      this.get('$slidingComponent').css({ transform: 'translateX(' + translate + 'px)' });
      //TODO: for future possible frost glass effect
//      if (additionalElement) {
//        additionalElement.css({ transform: 'translateX(' + (-translate - 40) + 'px)' });
//      }
    }
  }.observes('menuProgress'),

  updateElementProgress: function() {
    var newProgress = 0;

    if (this.get('slideDirection') === 'toLeft') {
      newProgress = -Math.abs(Math.max((this.width - this.movement.lastX + this.offset) / this.width, -1));
      if (newProgress >= -1) { this.menuProgressService.updateProgress(newProgress); }
    } else {
      newProgress = Math.min((this.movement.lastX  + this.offset) / this.width, 1);
      if (newProgress <= 1) { this.menuProgressService.updateProgress(newProgress); }
    }
    this.tick = false;
  },

  /**
   * Complete exapansion of sliding element
   */
  completeExpansion: function(){
    var progress = this.get('menuProgress'), speed = this.movement.speedX, newProgress = 0,
      inverseConstraint = 0, reverseConstraint = 0,
      movementConstraint = false;

    if (progress === -1 || progress === 0 || progress === 1) {
      return;
    }

    if (this.get('slideDirection') === 'toLeft') {
      inverseConstraint = -1;
      reverseConstraint = 0;
      movementConstraint = speed > 0.5 || speed > 0 && speed < 0.5 && progress < -0.5;
    } else {
      inverseConstraint = 0;
      reverseConstraint = 1;
      movementConstraint = speed > -0.5 || speed >= 0.5 && progress > 0.5;
    }

    if (movementConstraint) {
      newProgress = Math.max(this.get('menuProgress') - this.get('defaultSpeed'), inverseConstraint);
      this.set('menuProgress', newProgress);
    } else {
      newProgress = Math.min(this.get('menuProgress') + this.get('defaultSpeed'), reverseConstraint);
      this.set('menuProgress', newProgress);
    }

    if (newProgress > inverseConstraint && newProgress < reverseConstraint) {
      requestAnimationFrame(this.completeExpansion.bind(this));
    }
    if (newProgress === 0) { this.get('$slidingComponent').css({ visibility: 'hidden' }); }
  }

//  TODO: for future possible frost glass effect
//  $blurredContent: null,
//  initElement: function() {
//    this._super();
//
//    var element = this, blurredScroll = element.get('$slidingComponent').find('.blurred-scroll');
//    Ember.run.later(function() {
//      var contentClone = Ember.$('.screen-content').clone();
//      blurredScroll.append(contentClone);
//      contentClone.css({ transform: 'translateX(-40px)' });
//      element.set('$blurredContent', contentClone);
//    }, 1000);
//
//  }.on('didInsertElement'),
//
//  /**
//   * Rendering observer with constraints
//   */
//  animateSliding: function() {
//    this._super(this.get('$blurredContent'));
//  }.observes('menuProgress')
});
