const router = require('express').Router();

const Video = require('../models/video');

router.get('/', async (req, res) => {  
  res.redirect('/videos');
});

router.get('/videos', async (req, res) => {  
 const videos = await Video.find({});  
 res.render('videos/index', {videos});
});

router.get('/videos/show', async (req, res) => {  
  const video = await Video.findById(req.params.videoId);
  res.render('videos/show', {video});
});

router.get('/videos/new', (req, res) => {
  res.render('videos/new');
});

router.get('/videos/:videoId', async (req, res) => {
  const video = await Video.findById(req.params.videoId);
  res.render('videos/show', {video});
});

router.get('/videos/update/:videoId', async (req, res) => {
  const video = await Video.findById(req.params.videoId);
  res.render('videos/edit', {video});
});

router.post('/videos/new', async (req, res) => {
  const {title, description, url} = req.body; 
  const newVideo = new Video({title, description, url});
  
  newVideo.validateSync();
  
  if (newVideo.errors) {
    res.status(400).render('videos/new', {video: newVideo});
  } else {
    const video = await Video.create({ title, description, url });
    res.redirect('/videos/' + video._id);
  }  
});

router.post('/videos/:videoId/updates', async (req, res) => { 
  const {title, description, url} = req.body; 
  const newVideo = new Video({title, description, url});
  
  newVideo.validateSync();
  
  if (newVideo.errors) {
    res.status(400).render('videos/edit', {video: newVideo});
  } else {

    await Video.findByIdAndUpdate(  
      req.params.videoId,
      req.body,
      {new: true},
      (err, video) => {
          if (err) return res.status(400).render('videos/edit', {video: newVideo});
          res.redirect('/videos/' + video._id);
      });
  }
});

router.delete('/videos/:videoId/deletions', async (req, res) => {
  await Video.findByIdAndRemove(req.params.videoId);
  res.redirect('/');
});

router.post('/videos/:videoId/deletions', async (req, res) => {
  await Video.findByIdAndRemove(req.params.videoId);
  res.redirect('/');
});


module.exports = router;
