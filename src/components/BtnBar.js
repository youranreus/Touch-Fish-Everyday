/**
 * @author 季悠然
 * @date 2021-12-07
 */
import React from 'react';
import {Button, Notification} from "@douyinfe/semi-ui";
import {IconBolt, IconLikeHeart, IconLikeThumb, IconTriangleUp, IconCheckboxTick} from "@douyinfe/semi-icons";

class BtnBar extends React.Component {
    constructor(props) {
        super(props);
        this.c = props.c;
        this.state = {
            accomplished: props.accomplished
        };
        this.show = props.show;
    }

    static getDerivedStateFromProps(nextProps) {
        const {accomplished} = nextProps;
        return {
            accomplished,
        };
    }

    sendLike = () => {
        Notification.open({
            title: this.c.customMsg.likeMsg[0],
            content: this.c.customMsg.likeMsg[1],
            duration: 3,
            icon: <IconLikeHeart style={{color: "red"}}/>
        });
        window.location = "mailto:" + this.c.contact + "?subject=今天也辛苦啦&body=今天已经很努力啦，放松一下吧~";
    }

    punch = () => {
        Notification.open({
            title: this.c.customMsg.punchMsg[0],
            content: this.c.customMsg.punchMsg[1],
            duration: 3,
        });
        window.location = "mailto:" + this.c.contact + "?subject=还在摸鱼？&body=今日事今日毕！快点起床！";
    }

    sendNotice = () => {
        Notification.open({
            title: this.c.customMsg.supportMsg[0],
            content: this.c.customMsg.supportMsg[1],
            duration: 3,
        });
        window.location = "mailto:" + this.c.contact + "?subject=加油！&body=坚持就是胜利！";
    }

    render() {
        return (
            <div className="BtnBar">
                {this.state.accomplished ?
                    <Button theme='solid' type='primary' size={"large"} style={{borderRadius: "1000rem"}}
                            onClick={this.sendLike}
                            icon={
                                <IconLikeThumb/>}>表扬一下！</Button> : (this.c.offWorkTime < new Date().getHours()) ?
                        <Button theme='solid' type='danger' size={"large"} style={{borderRadius: "1000rem"}}
                                onClick={this.punch}
                                icon={<IconBolt/>}>还敢摸鱼？加班！</Button> :
                        <Button theme='solid' type='primary' size={"large"} onClick={this.sendNotice}
                                style={{borderRadius: "1000rem"}} icon={<IconTriangleUp/>}>给他加加油</Button>}

                <Button theme='solid' type="primary" size={"large"}
                        style={{borderRadius: "1000rem", marginLeft: "1.5rem"}} icon={<IconCheckboxTick/>} onClick={this.show}>
                    都干了些啥？
                </Button>
            </div>
        );
    }
}

export default BtnBar;