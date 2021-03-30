import { red } from '@material-ui/core/colors';

const styles = () => ({
  root: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
  },
  minWidth: {
    maxWidth: 250,
  },
  content: {
    flex: 1,
  },
  media: {
    height: 250,
  },
  minMedia: {
    height: 100,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export default styles;
