import { accessControlPages } from '../../../security';
import Users from '../../../src/screens/Users';

const Page = (props) => <Users {...props} />;

export const getServerSideProps = (ctx) =>
  accessControlPages({
    ctx,
    acl: 'admin',
    props: async () => {
      let data = {};
      const res = await fetch('http://localhost:3000/api/users');
      data = await res.json();
      return {
        data: JSON.parse(JSON.stringify(data)),
      };
    },
  });

export default Page;
