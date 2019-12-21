import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    formatMessage,
    ...props,
  });

  const defaultFooterDom = (
    <DefaultFooter
      copyright="By Zean"
      links={[
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/GZ315200',
          blankTarget: true,
        },
      ]}
    />
  );
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Easy CRM</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
        {defaultFooterDom}
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
