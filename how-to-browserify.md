## Browserify-ing npm modules

According to the k6 docs(https://k6.io/docs/using-k6/modules#npm-modules) we can use browserify to bundle individual npm modules for use in our scripts.

The way we did this was to npm-install the module that we want, then find the main .js file that is used by that module (somewhere in node_modules folder for that package). That is the file that we want to browserify. When we browserify it, we do it into the vendor folder (simply for convention). Here are some examples that we have used so far:

```
browserify ./node_modules/moment/moment.js -s moment > ./vendor/moment.js
browserify ./node_modules/uuid/v1.js -s uuid/v1 > ./vendor/uuidv1.js
browserify ./node_modules/graphql-tag/src/index.js -s graphql-tag > ./vendor/graphql-tag.js
```

After having run these commands. we are then able to import these modules into our scripts via:

```
  import { sleep } from "k6";
  import moment from "./vendor/moment.js";
  import uuidv1 from "./vendor/uuidv1.js";
  import gql from "./vendor/graphql-tag.js";
```
