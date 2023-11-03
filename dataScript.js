import mongoose from 'mongoose';
import {faker} from '@faker-js/faker';
import User from './models/User.js';
import Blog from './models/Blog.js';
import Comment from './models/Comments.js';

(async () => {
    await mongoose.connect("mongodb+srv://root:root@cluster0.0ts0l43.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
})();

async function generateRandomData(numberOfUsers) {

    for (let i = 0; i < numberOfUsers; i++) {
        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            registrationDate: faker.date.recent()
        };

        const newUser = await User.create(user);

        const numberOfBlogs = Math.floor(Math.random() * 10) + 1;
        for (let j = 0; j < numberOfBlogs; j++) {

            const numberOfTags = Math.floor(Math.random() * 10) + 1;
            let tags = [];
            for (let k = 0; k < numberOfTags; k++) {
                tags.push(faker.lorem.words());
            }

            const generatedBlog = {
                title: faker.lorem.words(),
                content: faker.lorem.paragraphs(),
                author: newUser._id,
                tags: tags,
                creationDate: Date.now()
            };

            const blog = await Blog.create(generatedBlog);

            const numberOfComments = Math.floor(Math.random() * 10) + 1;
            for (let k = 0; k < numberOfComments; k++) {
                const generatedComment = {
                    commenterName: faker.internet.userName(),
                    commentText: faker.lorem.paragraph(),
                    creationDate: Date.now(),
                    blogPost: blog._id
                };

                const comment = await Comment.create(generatedComment);
            }

            await blog.save();
        }
        await newUser.save();
    }

    console.log('\nData insertion is sucessful');
    process.exit(0);
}

import readline from 'readline';
import { exit } from 'process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addCommentsToBlogPost() {
    rl.question('Please enter the id of the blog post: ', async (blogPostId) => {
        try {
            const blog = await Blog.findById(blogPostId);
            if (!blog) {
                console.log('Blog does not exists');
                return;
            }

            const numberOfComments = Math.floor(Math.random() * 10) + 1;
            console.log(`Adding ${numberOfComments} random comments`)

                for (let i = 0; i < numberOfComments; i++) {
                    const name = faker.internet.userName();
                    const commentText = faker.lorem.paragraph();

                    const newComment = await Comment.create({
                        commenterName: name,
                        commentText,
                        creationDate: Date.now(),
                        blogPost: blog._id
                    });

                    await newComment.save();

                    console.log('Comment are added successfully to the blog post');
                    console.log('******************************************');
                    console.log(newComment);
                }

                console.log(numberOfComments + ' comments are added successfully');


            exit(0);
        } catch (error) {
            console.log(error);
        }
    });
}

function readCommentsOfBlogPost() {
    rl.question('Please enter the id of the blog post: ', async (blogPostId) => {
        try {
            const blog = await Blog.findById(blogPostId);
            if (!blog) {
                console.log('Blog does not exists');
                return;
            }

            const comments = await Comment.find({ blogPost: blog._id });

            console.log(comments);

            exit(0);
        } catch (error) {
            console.log(error);
        }
    });
}

function deleteCommentsOfBlogPost() {
    rl.question('Please enter the id of the blog post: ', async (blogPostId) => {
        try {
            
            const blog = await Blog.findById(blogPostId);
            if (!blog) {
                console.log('Blog does not exists');
                return;
            }

            await Comment.deleteMany({ blogPost: blog._id });
            await blog.save();

            console.log('Comments are deleted successfully');
            console.log('*****************************************');
            console.log(blog);
            
            exit(0);
        } catch (error) {
            console.log(error);
        }
    });
}

rl.question(`Select an option:
    1. add random user blogs and comments in db
    2. add comments to a blog post
    3. read comments of a blog post
    4. delete comments of a blog post
    5. exit
    `, (option) => {
    if(option === '1') {

        rl.question('Please enter the number of users to create: ', (numberOfUsers) => {
            generateRandomData(numberOfUsers);
        });
    } else if(option === '2') {
        addCommentsToBlogPost();
    } else if(option === '3') {
        readCommentsOfBlogPost();
    } else if(option === '4') {
        deleteCommentsOfBlogPost();
    }  else if(option === '5') {
        rl.close();
        process.exit(0);
    } else {
        console.log('Invalid option');
    }
});
