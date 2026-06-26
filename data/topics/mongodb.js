export const mongodbContent = {
  slug: "mongodb",
  briefDescription: [
    "MongoDB is a NoSQL document database that stores data as BSON (Binary JSON) documents in collections. Unlike SQL tables, MongoDB collections don't require a fixed schema — each document can have different fields. You can run MongoDB locally or use MongoDB Atlas (cloud). MongoDB Compass is a GUI tool for visualizing your data. In Node.js, you connect to MongoDB using Mongoose (an ODM) with mongoose.connect(MONGODB_URI).",
    "MongoDB's query language supports rich filtering using operators: $eq, $ne, $gt, $lt, $gte, $lte for comparisons; $in, $nin for arrays; $and, $or, $not for logical conditions; $regex for pattern matching. For updates: $set modifies specific fields, $push/$pull manages arrays, $inc increments numbers. The aggregation pipeline processes documents through stages sequentially: $match (filter), $group (aggregate), $sort, $project (reshape), $lookup (JOIN), $limit, $skip.",
    "Database relationships in MongoDB: One-to-One (embed or reference), One-to-Many (array of ObjectIds or embedded array), Many-to-Many (arrays of ObjectIds in both schemas). When you store ObjectId references, Mongoose's populate() method resolves them to full documents. For performance, create indexes on frequently queried fields: single-field, compound (multi-field), text (for search), and TTL (auto-delete). MongoDB Atlas provides cloud hosting with auto-scaling and MongoDB Compass for local DB management.",
  ],
  keyConcepts: [
    "Documents, Collections, Databases — MongoDB's data hierarchy",
    "MongoDB Compass: GUI tool to view/edit MongoDB data locally and on Atlas",
    "Data types: String, Number, Boolean, Date, ObjectId, Array, Embedded Document",
    "CRUD: insertOne/insertMany, find/findOne, updateOne/updateMany, deleteOne/deleteMany",
    "Query operators: $eq, $gt, $in, $and, $or, $regex — filter documents",
    "Update operators: $set (change fields), $push/$pull (manage arrays), $inc (increment)",
    "Database relations: One-to-One, One-to-Many, Many-to-Many, Polymorphic",
    "Mongoose populate(): replaces ObjectId references with full documents",
    "Aggregation pipeline: $match, $group, $lookup, $project, $sort, $facet",
    "MongoDB operators: Comparison ($eq, $lt), Logical ($and, $or), Array ($push, $pop)",
    "Indexing: single-field, compound, text, TTL indexes for performance",
    "MongoDB Atlas: cloud-hosted MongoDB with auto-scaling and built-in search",
  ],
  codeExample: {
    language: "javascript",
    title: "Mongoose Schema + CRUD + Aggregation Pipeline",
    code: `const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

// Schema definition
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  views: { type: Number, default: 0 },
}, { timestamps: true })

// Text index for search
postSchema.index({ title: 'text', content: 'text' })

const Post = mongoose.model('Post', postSchema)

// ── CRUD ─────────────────────────────────────────

// Create
const post = await Post.create({
  title: 'Getting Started with MongoDB',
  author: userId,
  tags: ['mongodb', 'database'],
})

// Read with filter
const posts = await Post.find({
  tags: { $in: ['mongodb'] },
  views: { $gt: 100 },
  createdAt: { $gte: new Date('2026-01-01') },
})
.populate('author', 'name email')  // resolve ObjectId → User doc
.sort({ views: -1 })
.limit(10)

// Update specific fields
await Post.updateOne(
  { _id: postId },
  { $set: { title: 'Updated Title' }, $inc: { views: 1 } }
)

// Delete
await Post.deleteOne({ _id: postId })

// ── Aggregation Pipeline ──────────────────────────
const topAuthors = await Post.aggregate([
  { $match: { createdAt: { $gte: new Date('2026-01-01') } } },
  { $group: {
    _id: '$author',
    totalViews: { $sum: '$views' },
    postCount: { $sum: 1 }
  }},
  { $sort: { totalViews: -1 } },
  { $limit: 5 },
  { $lookup: {
    from: 'users',
    localField: '_id',
    foreignField: '_id',
    as: 'authorInfo'
  }},
  { $project: {
    authorName: { $arrayElemAt: ['$authorInfo.name', 0] },
    totalViews: 1,
    postCount: 1,
  }}
])`,
  },
}
