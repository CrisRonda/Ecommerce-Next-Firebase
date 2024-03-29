import nextcookies from 'next-cookies';
import { getUserById } from '../../../src/services/server/user/db';
import { getProductsById } from '../../../src/services/server/products/db';
import Products from '../../../src/screens/Products';
import { accessControlPages } from '../../../security';

const Page = (props) => <Products {...props} />;

export const getServerSideProps = (ctx) =>
  accessControlPages({
    ctx,
    acl: 'seller',
    props: async () => {
      const {
        query: { uid },
        res,
      } = ctx;
      const { uid: _uid } = nextcookies(ctx).__session || {};

      if (!uid || uid !== _uid) {
        res.statusCode = 302;
        res.setHeader('Location', '/404');
      }
      try {
        const user = await getUserById(uid);
        const products = await getProductsById(uid);

        return {
          userDB: JSON.parse(JSON.stringify(user)),
          products: JSON.parse(JSON.stringify(products)),
        };
      } catch (error) {
        res.statusCode = 302;
        return res.setHeader('Location', '/404');
      }
    },
  });
export default Page;
