class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //Filtering
    const queryObj = { ...this.queryString };
    const excludedFiled = ['page', 'sort', 'limit', 'fields'];
    excludedFiled.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    //Advanced filtering || Lecture 15 Problem
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //{ difficulty: 'easy' , duration:{ $gte:5} }
    //{ difficulty:'easy' ,  durationL{ gte:5}}
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    //2. Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      //sort ('price averageRating)
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    //3 Field Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
