export const loadState = (component, properties) => {
  const loadedState = {};
  properties.forEach((attribute) => {
    loadedState[attribute] = localStorage.getItem(attribute);
  });
  component.setState({...loadedState});
};
