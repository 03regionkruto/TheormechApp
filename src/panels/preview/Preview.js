import React from 'react';
import Answer from "./fragments/Answer";

import s from "./Preview.module.css";
import ProgressFragment from "./fragments/ProgressFragment";
import {Link} from "react-router-dom";
import QuestionStatus from "../../preview/service/QuestionStatus";
import QuestionItemFragment from "./fragments/QuestionItemFragment";
import PreviewUtil from "../../preview/service/TestStatus";
import isUndefined from "../../common/IsUndefined";

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application
        this.previewService = this.application.providePreviewService();
        this.testId = props.match.params.testId;

        this.state = {
            show_answer_window: false,
        };


        this.show_answer_window = () => {
            this.setState({show_answer_window: true})
        };

        this.hide_answer_window = () => {
            this.setState({show_answer_window: false})
        };
    }

    componentDidMount() {
        this.previewService.getHistory(this.testId, this.application.provideUser())
            .then(history => {
                this.previewService.getTest(this.testId)
                    .then(testInfo => {
                        testInfo.questions = this.previewService.prepareQuestions(testInfo.questions, this.state.history);
                        this.setState({testInfo: testInfo})
                    });
                this.setState({history: history});

                const currentScore = this.previewService.getCurrentScore(history);
                this.setState({currentScore: currentScore});

                const lastQuestion = this.previewService.getLastQuestion(history);
                this.setState({lastQuestion: lastQuestion});
            });

    }


    renderQuestions = () => {
        if (!isUndefined(this.state.testInfo) && !isUndefined(this.state.lastQuestion)) {
            let uniq = []
            let questions = this.state.testInfo.questions.filter(question => question.status !== QuestionStatus.UNTOUCHED);
            this.state.testInfo.questions.map(question => {
                if (question.serialNumber > this.state.lastQuestion && !uniq.includes(question.serialNumber)) {
                    questions.push(question);
                    uniq.push(question.serialNumber);
                }
            })

            questions.sort((o1, o2) => {
                return o1.serialNumber - o2.serialNumber;
            });
            return questions.map(question => {
                return (
                    <li className={s.question_item}>
                        <QuestionItemFragment
                            serialNumber={question.serialNumber}
                            status={question.status}
                            onClick={this.state.onClick}/>
                    </li>
                )
            })
        }
    };

    getStatusView = () => {
        if (!isUndefined(this.state.lastQuestion) && !isUndefined(this.state.testInfo)) {
            const testStatus = this.previewService.getStatus(this.state.lastQuestion, this.state.testInfo.maxScore);

            switch (testStatus) {
                case PreviewUtil.UNTOUCHED:
                    return "Не начато";
                case PreviewUtil.NOT_FINISHED:
                    return "На закончено";
                case PreviewUtil.FINISHED:
                    return "Завершено";
            }
        } else {
            return "Не начато";
        }

    };

    render() {
        //Need to insert question status
        const testInfo = this.state.testInfo;

        return (
            <section className={s.preview_wrapper}>
                <div className={s.background}>
                    <img
                        src={!isUndefined(testInfo) ? testInfo.img : ""}
                        alt={"background"}
                        height={"400"}/>
                </div>
                <section className={`${s.modal_window} ${this.state.className ? s.blur : ""}`}>
                    <div className={s.slider_wrapper}>
                        <div className={s.slider}/>
                    </div>
                    <div className={s.content_wrapper}>
                        <div className={s.title}>
                            {!isUndefined(testInfo) ? testInfo.title : ""}
                        </div>
                        <div className={s.status}>
                            Состояние: {this.getStatusView()}
                        </div>
                        <div className={s.description}>
                            {!isUndefined(testInfo) ? testInfo.description : ""}
                        </div>
                        <div className={s.progress}>
                            <div className={s.progress_title}>
                                Мой прогресс
                            </div>
                            <ProgressFragment key={[this.state.currentScore, this.state.testInfo]}
                                              maxScore={!isUndefined(testInfo) ? testInfo.maxScore : 0}
                                              currentScore={!isUndefined(this.state.currentScore) ? this.state.currentScore : 0}
                                              time={!isUndefined(testInfo) ? testInfo.timeToComplete : null}/>
                        </div>
                        <ul className={s.question_list}>
                            {this.renderQuestions()}
                        </ul>

                    </div>
                    <div className={s.button}>
                        <Link to={'/question'} className={s.link}>
                            <div> Пройти тест</div>
                        </Link>
                    </div>
                </section>
                {this.state.show_answer_window ? <Answer onClick={this.hide_answer_window}/> : ""}

            </section>
        )
    }
}

export default Preview;
