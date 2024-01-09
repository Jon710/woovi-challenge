import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { printSchema } from 'graphql/utilities';

import { schema } from '../src/schema/schema';

const schemaFile = 'schema.graphql';

const generateSchema = async () => {
  const configs = [
    { schema, path: path.join(process.cwd(), './graphql', schemaFile) },
  ];

  for (const config of configs) {
    const dirPath = config.path.split(schemaFile)[0];

    if (!fsSync.existsSync(dirPath)) await fs.mkdir(dirPath);

    await fs.writeFile(config.path, printSchema(config.schema));
  }
};

generateSchema();
