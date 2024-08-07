# Use the latest Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN yarn generate

# Copy the rest of the application code
COPY . .

# Copy the .env file (consider removing this for production)
COPY .env .env

# Set environment variables
ENV NODE_ENV=production


# Expose the port the app runs on
EXPOSE 3000

# Command to run the worker in production
CMD ["yarn", "start"]
