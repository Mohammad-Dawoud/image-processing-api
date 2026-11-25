import express from 'express';
import imgCropper from '../utilities/cropper';
const path = require('path');
const fs = require('fs');
const img_router = express.Router();

const errMessage: string = `
      <h2>image not found, please enter valid image from the following:</h2>
      <ul>
        <li><a href="http://localhost:3000/images/cat">cat</a></li>
        <li><a href="http://localhost:3000/images/dome">dome</a></li>
        <li><a href="http://localhost:3000/images/lion">lion</a></li>
        <li><a href="http://localhost:3000/images/winxp">winxp</a></li>
      </ul>
      `;

img_router.get(
  '/:imgName',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const img_name: string = req.params.imgName;
    const widthParam = req.query.width;
    const heightParam = req.query.height;
    const img_width: number = parseInt(widthParam as string);
    const img_height: number = parseInt(heightParam as string);

    // read available images
    const img_names: string[] = await fs.promises.readdir('images');
    const sourceIMG: string = path.join(
      __dirname,
      '../',
      '../',
      'images',
      `${img_name}.jpg`
    );
    const distinationIMG: string = path.join(
      __dirname,
      '../',
      '../',
      'croppedImages',
      `${img_name}-${img_width}-${img_height}.jpg`
    );

    // Error: missing filename

    if (!img_name) {
      res.status(400).json({ error: 'Missing required parameter: filename' });
      return;
    }

    // Error: missing width or height
    if (!widthParam || !heightParam) {
      res
        .status(400)
        .json({ error: 'Missing required parameter: width or height' });
      return;
    }

    // Special case: width=0 and height=0 means return original image
    if (img_width === 0 && img_height === 0) {
      if (!img_names.includes(img_name + '.jpg')) {
        res
          .status(404)
          .json({ error: `Image file '${img_name}.jpg' not found.` });
        return;
      }
      res.status(200).sendFile(sourceIMG);
      return;
    }

    // Error: invalid width/height (not a number, NaN, negative, zero)
    if (
      isNaN(img_width) ||
      isNaN(img_height) ||
      img_width < 0 ||
      img_height < 0 ||
      img_width === 0 ||
      img_height === 0
    ) {
      res
        .status(400)
        .json({ error: 'Invalid width or height. Must be positive integers.' });
      return;
    }

    // Error: non-existent image file
    if (!img_names.includes(img_name + '.jpg')) {
      res
        .status(404)
        .json({ error: `Image file '${img_name}.jpg' not found.` });
      return;
    }

    try {
      await imgCropper(sourceIMG, distinationIMG, img_width, img_height);
      await res.status(200).sendFile(distinationIMG);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Internal server error while processing the image.' });
    }
  }
);

export default img_router;
