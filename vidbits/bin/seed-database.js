#!/usr/bin/env node

const {mongoose, databaseUrl, options} = require('../database');
const Video = require('../models/video');

const seed = async () => {
  await mongoose.connect(databaseUrl, options);
  const video1 = {
    title: 'Seed Video 1',
    description: `Excited train guy, New York!`,
    url: 'https://www.youtube.com/embed/6lutNECOZFw',
  };
  const video2 = {
    title: 'Seed Video 2',
    description: `The Ghost Train`,
    url: 'https://www.youtube.com/embed/bsHHzCP09xs',
  };
  const video3 = {
    title: 'Seed Video 3',
    description: `Attempting to move the Bigboy 4018`,
    url: 'https://www.youtube.com/embed/Wvj7H_CZxmM',
  };
  const video4 = {
    title: 'Seed Video 4',
    description: `CP Coal Train Breaks Apart !! Goes into Emergency Drone`,
    url: 'https://www.youtube.com/embed/40ywU_K9Yu4',
  };

  await Video.create(video1);
  await Video.create(video2);
  await Video.create(video3);
  await Video.create(video4);
};

seed()
.then(() => {
  console.log('Seeded database sucessfully');
  process.exit(0);
})
.catch(err => {
  console.log('Database seed unsuccessful');
  throw err;
  process.exit(1);
});
