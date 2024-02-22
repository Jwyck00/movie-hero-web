import { extendTheme } from "@chakra-ui/react";
import foundations from './foundations';
import * as components from './components';

export const theme = extendTheme({
  ...foundations,
  components: { ...components },

});
