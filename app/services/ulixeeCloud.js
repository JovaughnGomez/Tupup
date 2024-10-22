import { CloudNode } from '@ulixee/cloud';

(async () => {
  console.log("Opening Cloud");
  const cloudNode = new CloudNode({
    port: 3003,
  });
  await cloudNode.listen();
})();