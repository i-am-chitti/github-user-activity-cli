#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import figlet from 'figlet';
import ora from 'ora';
import eventParser from './src/utils/event-parser.js';

console.log(chalk.yellow( figlet.textSync( 'GH Activity')) );

program.version('1.0.0').description('A simple CLI for getting GitHub user activity');

const displayGitHubActivity = async (username) => {
    username = username.trim();

    if ( ! username ) {
        console.log( chalk.red('Please provide a valid GitHub username.') );
        return;
    }

    const apiURL = `https://api.github.com/users/${username}/events`;

    const spinner = ora('Loading user activity...').start();

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        spinner.stop();

        if ( ! Array.isArray(data) ) {
            console.log( chalk.red('An error occurred while fetching user activity. Check if the username is valid.') );
            return;
        }

        if ( ! data.length ) {
            console.log( chalk.red(`No activity found for user ${username}.`) );
            return;
        }

        console.log( chalk.green(`Hey, ${username}! Here are your recent activities on GitHub:`) );

        console.log( chalk.white('---') );

        data.forEach((activity) => {
                const { message } = eventParser(activity);

                if ( ! message ) {
                    return;
                }

                console.log( chalk.white(`- ${message}`) );
        });

        console.log( chalk.white('---') );
    } catch (error) {
        spinner.stop();
        console.log( chalk.red('An error occurred while fetching user activity. ') );
    }
};

program.argument('<username>').action(displayGitHubActivity);

program.parse(process.argv);
