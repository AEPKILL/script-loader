# Install

`npm install deferred-factory`

# Use

## with typescript

``` typescript
import { deferred } from 'deferred-factory';
async function demo(){
  const defer = deferred<{ name: string }>();
  setTimeout(() => defer.resolve({name: 'aepkill'}), 2000);
  const value = await defer.promise;
  console.log(value.name);
}
```

## with  javascript

```javascript
import { deferred } from 'deferred-factory';
async function demo(){
  const defer = deferred();
  setTimeout(() => defer.resolve({name: 'aepkill'}), 2000);
  const value = await defer.promise;
  console.log(value.name);
}
```

# Other

## test

`npm run test`

## build

`npm run build`