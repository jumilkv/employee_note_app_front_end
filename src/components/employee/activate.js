import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DataFetch from '../../utils/dataFetch';

export default function SwitchActive(props) {
  const [active, setActive] = React.useState(props.active === true);
  const handleSwitchChange = event => {
    setActive(event.target.checked);
    let status = event.target.checked ? true : false
    DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee/${status}/${props.id}`, "PUT").then(result => {
      props.fetchData(props.type)
    });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={active} onChange={handleSwitchChange} value={active} />
        }
        label={active ? 'Active' : 'Inactive'}
      />

    </FormGroup>
  );
}