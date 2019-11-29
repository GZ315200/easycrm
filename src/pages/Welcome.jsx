import React, { Component } from 'react';
import { connect } from 'dva';
import style from './welcome.less'
import footerImg from '../assets/bottom.png'


@connect(({ user }) => ({ user }))
export default class Welcome extends Component {
  render() {
    const {
      user: { currentUser },
    } = this.props
    return (
      <div className={style.container}>
        <div className={style.content}>
          {currentUser.name ? <p className={style.username}>{currentUser.name}，您好！</p> : ''}
          <p className={style.welcome_text}>
             欢迎使用Easy CRM
          </p>
          <img className={style.footer} src={footerImg} alt="logo" />
        </div>
      </div>
    )
  }
}
