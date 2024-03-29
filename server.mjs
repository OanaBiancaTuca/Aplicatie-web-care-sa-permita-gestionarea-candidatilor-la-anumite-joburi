import express, { json } from 'express';

import cors from 'cors';
import { join, resolve } from 'path';

import { initialize } from './repository.mjs';

import router from './router.mjs';

express()
	.use(cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		optionsSuccessStatus: 200
	}))

	.use(json())

	.use(express.static(join(resolve(), 'public')))

	.use('/models', router)//pe calea '/models' inregistrez toate rutele definite

	.listen(process.env.PORT || 8080, async () => { 
		try {
			await initialize();
		} catch (error) {
			console.error(error);
		}
		
	});