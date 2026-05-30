export const mongodbContent = {
  slug: "mongodb",
  briefDescription: [
    "MongoDB is a document-oriented NoSQL database that stores data as BSON (Binary JSON) documents. Its flexible schema lets you store related data together in rich, hierarchical documents instead of spread across multiple tables.",
    "MongoDB's query language supports rich filtering, aggregation pipelines, text search, geospatial queries, and change streams. The aggregation pipeline ($match, $group, $lookup, $project) is MongoDB's equivalent of SQL's GROUP BY + JOIN.",
    "MongoDB Atlas provides a fully managed cloud service with auto-scaling, built-in search (Atlas Search powered by Lucene), and global multi-region clusters. Mongoose is the most popular ODM (Object Document Mapper) for Node.js.",
  ],
  keyConcepts: [
    "Documents, Collections, and Databases",
    "CRUD: insertOne/insertMany, find/findOne, updateOne/updateMany, deleteOne",
    "Query operators: $eq, $gt, $in, $and, $or, $regex",
    "Aggregation pipeline: $match, $group, $lookup, $project, $sort",
    "Indexes: single field, compound, text, geospatial, TTL",
    "Mongoose: Schema, Model, populate() for references",
    "Transactions in MongoDB (replica sets required)",
    "Atlas Search for full-text search",
  ],
  codeExample: {
    language: "javascript",
    title: "Mongoose Schema + Aggregation Pipeline",
    code: `const mongoose = require('mongoose')

// Schema definition
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

postSchema.index({ title: 'text', content: 'text' })

const Post = mongoose.model('Post', postSchema)

// Aggregation: top authors by total views
const topAuthors = await Post.aggregate([
  { $match: { createdAt: { $gte: new Date('2024-01-01') } } },
  { $group: {
    _id: '$author',
    totalViews: { $sum: '$views' },
    postCount: { $sum: 1 }
  }},
  { $sort: { totalViews: -1 } },
  { $limit: 10 },
  { $lookup: {
    from: 'users',
    localField: '_id',
    foreignField: '_id',
    as: 'authorInfo'
  }}
])`,
  },
}
