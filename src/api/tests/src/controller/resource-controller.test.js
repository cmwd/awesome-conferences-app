const tape = require('tape');
const request = require('supertest');
const proxyquire = require('proxyquire');
const alias = require('path-alias');
const express = require('express');
const sinon = require('sinon');
require('sinon-as-promised');
require('sinon-mongoose');
const mongoose = require('mongoose');
const { resourceModel } = require(
  alias.resolve('@model/resource-model'));
