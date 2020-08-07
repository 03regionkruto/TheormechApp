import React from 'react';

import s from './Profile.module.css';
import LevelFragment from "./LevelFragment";
import {Avatar} from "@vkontakte/vkui";
import isUndefined from "../../../common/IsUndefined";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.profileService = this.application.provideProfileService();

        this.state = {};
    }

    componentDidMount() {
        this.application.provideUser()
            .then(user => this.setState({user: user}));
    }


    render() {
        let user = this.state.user;
        return (
            <div className={s.profile_card}>
                <div className={s.slider}/>
                <div className={s.about}>
                    <Avatar src={this.state.user !== undefined ? this.state.user.photo_200 : ""} size={100}/>
                    <div className={s.bio}>
                        <div className={s.name}>
                            {
                                user !== undefined
                                    ? user.first_name + " " + user.last_name
                                    : ""
                            }
                        </div>
                        <div>
                            Студент теормеха
                        </div>
                        <div className={s.score}>
                            <img src={require("../../../img/profile/ic_score.svg")} alt={"score"}/>
                            <div>{!isUndefined(user) ? user.score : 0}</div>
                        </div>
                    </div>
                </div>
                <LevelFragment className={"level_fragment"}/>
                <div className={s.logo}>
                    <img src={require("../../../img/profile/ic_tm_logo.svg")} alt={"logo"}/>
                    <div>
                        Высшая школа теоретической механики
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;