import { Container, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MainNav from '../../nav';
import styles from './styles';

const useStyles = makeStyles(styles);

const ContainerResponsive = ({ children, center, disableNav, user, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <MainNav disableNav={disableNav} role={user ? user.role : undefined} />
      <Container
        className={clsx(classes.root, {
          [classes.center]: center,
        })}
        {...props}
      >
        {children}
      </Container>
    </>
  );
};

ContainerResponsive.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  center: PropTypes.bool,
  disableNav: PropTypes.bool,
  user: PropTypes.shape(),
};
ContainerResponsive.defaultProps = {
  center: false,
  disableNav: false,
  user: {
    role: '',
  },
};

export default ContainerResponsive;
