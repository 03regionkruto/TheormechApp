import React from 'react';

import s from './Result.module.css';
import { withRouter } from "react-router-dom";
import isUndefined from "../../common/IsUndefined";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.testId = parseInt(props.match.params.testId);
        this.resultService = this.application.provideResultService();
        this.state = {};
    }

    componentDidMount() {
        this.application.deleteUser();
        this.resultService.getData(this.testId)
            .then(data => this.setState({data: data}));
    }

    toTestList = () => {
        this.props.history.go(-2);
    };

    toTestPreview = () => {
        this.props.history.go(-1)
    };

    render() {
        const data = this.state.data;
        return (
            <div className={s.result_window}>

                <div className={s.result_bubble}>
                    <div>Твой результат</div>
                    <div className={s.percent}>{!isUndefined(data) ? data.percent : 0}%</div>
                    <div>{`${!isUndefined(data) ? data.current : 0}/${!isUndefined(data) ? data.max : 0}`}</div>
                </div>
                <div className={s.tip}>
                    <img alt={"tip"}
                         src={require("../../img/result/ic_bulb.svg")}/>
                    <div>
                        Ты можешь тратить заработанные баллы на покупку новых стикеров
                    </div>
                </div>
                <div className={s.controls}>
                    <div onClick={this.toTestPreview}
                          className={s.first_button}>
                        <div>Хочу узнать больше!</div>
                    </div>
                    <div onClick={this.toTestList}
                          className={s.second_button}>
                        <div>Следующий тест</div>
                    </div>
                </div>
                <div className={s.planet_1}/>
                <div className={s.planet_2}/>
                <div className={s.planet_3}/>
            </div>
        )
    }
}

export default withRouter(Result);