/**
 * @author 季悠然
 * @date 2021-12-06
 */
import React from 'react';
import { Avatar } from '@douyinfe/semi-ui';

class CuAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.userData = {
            avatar: props.c.avatar,
            name: props.c.name
        };
    }

    render() {
        return (
            this.userData.avatar !== '' ? <Avatar size={"large"} src={this.userData.avatar}/> : <Avatar size={"large"}>{this.userData.name.slice(0,1)}</Avatar>
        );
    }
}

export default CuAvatar;