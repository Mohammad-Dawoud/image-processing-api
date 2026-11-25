import express from 'express';

const imgs_router: express.Router = express.Router();
const message: string = `
<h2>select image from the following:</h2>
<p>USE QUERIES TO SHOW IMAGE WITH SPECIFIC SIZE 👉 EX:
<a href="http://localhost:3000/images/dome?width=500&height=400">Image with size=(500x400)</a>
</p>
<ul>
<li><a href="http://localhost:3000/images/cat?width=0&height=0">cat</a></li>
<li><a href="http://localhost:3000/images/dome?width=0&height=0">dome</a></li>
<li><a href="http://localhost:3000/images/lion?width=0&height=0">lion</a></li>
<li><a href="http://localhost:3000/images/winxp?width=0&height=0">winxp</a></li>
</ul>
`;

imgs_router.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.status(200).send(message);
  }
);

export default imgs_router;
