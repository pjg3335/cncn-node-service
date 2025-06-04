import { Prisma } from '../generated';
import { DefaultArgs, DynamicQueryExtensionCbArgs, InternalArgs } from '../generated/runtime/library';

const versionUp = ({
  args,
  query,
}: DynamicQueryExtensionCbArgs<Prisma.TypeMap<InternalArgs & DefaultArgs, {}>, any, any, any>) => {
  if ('version' in args.where) {
    args.data = {
      ...args.data,
      version: { increment: 1 },
    };
  }
  return query(args);
};

const versionMiddleware = Prisma.defineExtension({
  name: 'pessimisticLockVersionUp',
  query: {
    $allModels: {
      update: versionUp,
      updateMany: versionUp,
      updateManyAndReturn: versionUp,
    },
  },
});

export default versionMiddleware;
