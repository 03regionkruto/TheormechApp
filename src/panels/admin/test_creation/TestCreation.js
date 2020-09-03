import React from 'react';
import s from "./TestCreation.module.css";
import Task from "../../main/testList/Task";
import BackHeader from "../../../common/components/backheader/BackHeader";
import Input from "./fragments/Input";

class TestCreation extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            title: 'Введите название',
            img: require('../../../img/admin/test_placeholder.svg'),
            date: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
        }
    }

    componentDidMount() {
        // this.state.lastChanged;
    }

    onTitleChange = (value) => {
        this.setState({
            title: value,
        });
    };

    render() {
        return (
            <section className={s.page}>
                <BackHeader/>
                <div className={s.test_card}>
                    <Task key={[this.state.title, this.state.img]}
                          disableButton
                          id={Math.random()}
                          title={this.state.title}
                          img={this.state.img}
                          date={this.state.date}
                          progress={new Promise(() => 0)}/>
                </div>
                <form className={s.inputs}>
                    <div className={s.input_title}>
                        Название
                    </div>
                    <Input placeholder={this.state.title}
                           onChange={this.onTitleChange}/>
                </form>
            </section>
        )
    }
}

export default TestCreation;