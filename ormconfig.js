var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'postgres',
      database: 'social-gql',
      entities: ['**/*.entity.js'],
      synchronize: true,
      username: 'postgres',
      password: 'example',
      // logging: true,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'postgres',
      database: 'test.social-gql',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
      synchronize: true,
      username: 'postgres',
      password: 'example',
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
