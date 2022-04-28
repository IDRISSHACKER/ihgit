const express = require('express');
const router = require('express').Router();
const https = require('https');

const githubPath = '/github/:user';
const repoPath = '/github/:user/:responsename';

router.get(githubPath, async (req, res) => {
    const user = req.params.user;
    const options = {
        hostname: 'api.github.com',
        path: `/users/${user}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
        },
        OAUth: process.env.GITHUB_TOKEN, 
    }

    https.get(options, (resp) => {
        resp.pipe(res);
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).json(
            {
                error: 500,
                msg: err.message,
                status: "Verifiez votre connexion internet"
            }
        );
    });
})

router.get(repoPath, async (req, res) => {
    const user = req.params.user;
    const options = {
        hostname: 'api.github.com',
        path: `/repos/${user}/${req.params.responsename}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
        },
        OAUth: process.env.GITHUB_TOKEN,
    }

    https.get(options, (resp) => {
        resp.pipe(res);
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).send(err.message);
    });
})

module.exports = router;