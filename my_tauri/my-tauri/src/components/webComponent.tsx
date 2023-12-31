import { Route } from 'react-router-dom';

type WebComponentType = {
  base_path: string;
  params_path: string;
  child: React.FC<any>;
  children?: any;
};

const WebComponent: React.FC<WebComponentType> = (prop: WebComponentType) => {
  const ChildComponent: React.FC<any> = (props: any) => {
    return prop.child({
      base_path: prop.base_path,
      params_path: prop.params_path,
      ...props,
    });
  };

  return (
    <Route
      path={prop.base_path + prop.params_path}
      component={ChildComponent}
    ></Route>
  );
};
export { WebComponent };
