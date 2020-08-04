import React from 'react';
import s from "./BackButton.module.css";
import { withRouter } from 'react-router-dom';

class BackButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className={s.button}
                onClick={this.props.history.goBack}/>
        );
    }
}

export default withRouter(BackButton);