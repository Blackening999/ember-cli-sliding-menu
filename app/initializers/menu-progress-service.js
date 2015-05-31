export function initialize(container, application) {
  application.inject('component', 'menuProgressService', 'service:menu-progress');
  application.inject('controller:application', 'menuProgressService', 'service:menu-progress');
}

export default {
  name: 'menu-progress-service',
  initialize: initialize
};
