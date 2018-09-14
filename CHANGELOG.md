# CHANGELOG

**`[5] CRUD Operations and CORS`**

## Steps

###### Routes Configuration

- [X] Create CRUD operations
  - [X] POST Request
  - [X] GET Request
  - [X] PUT Request
  - [X] DELETE Request

- [X] Test the requests with **POSTMAN**.

- [X] Parse the body from a request

- [X] Support JSON and URLENCODED as format data

- [X] Refactor CRUD operations to a `route` function

- [X] Configure `CORS` manually

- [X] Enable `OPTIONS` request

- [X] Add CRUD operations to Controller

---

**`[6] Configuring Data Access with MongoDB`**

## Steps

- [X] Install `MongoDB` locally

###### [See “How to install MongoDB locally” section](/how-to-install-mongodb-locally)

- [X] Install `mongoose` ODM

- [X] Connect the API using `mongoose` to MongoDB

- [X] Create a listener to Database `connection` event

- [X] Create `src/model` directory

- [X] Create `src/model/Companies.js` file

- [X] Use `mongoose.Schema` constructor to create an instance

- [X] Use the `Company` model in `Companies` controller

- [X] Create a `POST /companies` request to register a new company

- [X] Configure `GET /companies` to retrieve all saved data

- [X] Add correct documentation to `POST /companies` and `GET /companies`

- [X] Refactor to environment variables

##### How to install MongoDB locally

###### MongoDB Database Server

- [X] In Terminal:

1. `sudo apt-get purge mongodb-org*`

2. `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4`

3. `echo "deb [ arch=amd64,arm64,ppc64el,s390x ] http://repo.mongodb.com/apt/ubuntu xenial/mongodb-enterprise/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list`

4. `sudo apt-get update`

5. `sudo apt-get install mongodb`

6. `mongod --version`

7. `sudo apt-get install -y mongodb-org`

8. `mongod --version`

9. `sudo service mongodb start`

10. `mongo`

###### Install Robo 3T (formerly known as Robomongo)

- [X] Download the `.tar.gz` from [robomongo.org](https://robomongo.org/download)

- [X] Extract `.tar.gz` files

```sh
$ tar -xvzf «robomongo-file.tar.gz»
```

- [X] Move all data extracted into a folder `robomongo` under `/usr/local/bin`

```sh
$ sudo mkdir /usr/local/bin/robomongo
$ sudo mv robot3-1.2.1-linux-x86_64-3e50a65/* /usr/local/bin/robomongo
```

- [X] Under `/usr/local/bin/robomongo/bin` find an executable file and make a reference in the terminal

```sh
$ /usr/local/bin/robomongo/bin/robo3t
```

###### Make a file executable

```sh
$ sudo chmod +x robo3t
```

##### Account Configuration

###### MongoDB Atlas

- [X] Create an account on [MongoDB Atlas](https://www.mongodb.com/atlas)

- [X] Create New Cluster
  - [X] In “Cloud Provider & Region”
    - [X] Choose any **Free Tier Available** option
  - [X] In “Cluster Tier”
    - [X] Choose **M0** (first option)
  - [X] Add a “Cluster Name”
  - [X] Hit **Create Cluster** (green button)

- [X] Set *timezone* from Account

- [X] Create a MongoDB Atlas User with **Atlas Admin** privileges

- [X] In **“IP Whitelist”** add an IP Address
  - [X] Whitelist Entry: `0.0.0.0/0`

- [X] Hit **Connect** from **SANDBOX** configuration and choose **Connect Your Application**
  - [X] Click on **I am using driver 3.6 or later** and copy the server address

###### mLab Cloud Service

- [X] Create an account on [mLab](https://mlab.com)

- [X] Click **Create New** in the *MongoDB Deployments* section

- [X] This will open the *Cloud Provider Selection* screen
  - [X] Select any provider from the *Cloud Provider* section.
  - [X] Select the SANDBOX (Free) plan from the *Plan Type* section
  - [X] Click the **Continue** button

- [X] This will open the *Select Region* screen
  - [X] Select the region closest to you and then **Continue**

- [X] This will open the *Final Details* section
  - [X] Enter the name for the new database and then select **Continue**

- [X] This will open the *Order Confirmation* screen
  - [X] Click **Submit Order** to create the database

- [X] You will be returned to the home screen. Click on the *new database* you just created to open its details screen.
  - [X] The **URL** that you need to use to access your database is displayed on the text box.
  - [X] In order to use this you need to create a database user that you can specify in the URL.

- [X] Click the **Users** tab and select the **Add database user** button

- [X] Enter a username and password (twice), and then press Create. **Do not select “Make read only”**