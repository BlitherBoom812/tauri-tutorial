import { Button } from 'antd';
import axios from 'axios';

const WebButton: React.FC = (props: any) => {
    const onClick = () => {
        console.log(props.match.params.action)
        axios
        .post('http://localhost:12345/conv/button', {
          action: props.match.params.action
        })
        .then(function (response) {
          console.log(response.data.message);
        //   setResultText(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        //   message(error.message);
        });
    }
    console.log(props)
  return <Button onClick={onClick}>{props.match.params.name}</Button>;
};

export { WebButton };
