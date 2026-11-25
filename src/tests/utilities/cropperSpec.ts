import path from 'path';
import imgCropper from '../../utilities/cropper';

describe('Test image cropping using Sharp', () => {
  it('should get the cropped image with the specified width and height', async () => {
    const sourceIMG: string = path.join(
      __dirname,
      '../',
      '../',
      '../',
      'images',
      'cat.jpg'
    );
    const distinationIMG: string = path.join(
      __dirname,
      '../',
      '../',
      '../',
      'croppedImages',
      'cat-200-200.jpg'
    );

    await imgCropper(sourceIMG, distinationIMG, 200, 200);

    expect(distinationIMG).toBeTruthy();
  });

  it('should throw an error for invalid source image', async () => {
    const invalidSourceIMG: string = path.join(
      __dirname,
      '../',
      '../',
      '../',
      'images',
      'nonexistent.jpg'
    );
    const distinationIMG: string = path.join(
      __dirname,
      '../',
      '../',
      '../',
      'croppedImages',
      'nonexistent-200-200.jpg'
    );
    await expectAsync(
      imgCropper(invalidSourceIMG, distinationIMG, 200, 200)
    ).toBeRejected();
  });
});
