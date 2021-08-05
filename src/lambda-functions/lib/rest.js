class Rest {
  constructor(req, res) {
    this.res = res
    this.req = req
    this.middlewares = {
      post: [],
      patch: [],
      put: [],
      delete: [],
      get: [],
      "*": [],
    }
  }

  use(method, middleware) {
    if (!method)
      throw new Error("rest() : method must be defined for middlewares")
    if (!middleware) throw new Error("rest() : middleware is not defined")

    this.middlewares[method]?.push(middleware)

    return this
  }

  async applyMiddlewares(method) {
    const middlewaresOfMethod = this.middlewares[method]

    if (middlewaresOfMethod?.length === 0) return null
    if (!middlewaresOfMethod) throw new Error("incorrect method provided")

    try {
      await Promise.all(middlewaresOfMethod.map((mw) => mw(this.req, this.res)))
    } catch (error) {
      console.error("middlware failed")
      throw error
    }
  }

  async get(router = () => {}) {
    this.handleRouter(router, "get")
  }

  async post(router = () => {}) {
    this.handleRouter(router, "post")
  }

  async patch(router = () => {}) {
    this.handleRouter(router, "patch")
  }

  async delete(router = () => {}) {
    this.handleRouter(router, "delete")
  }

  async put(router = () => {}) {
    this.handleRouter(router, "put")
  }

  async handleRouter(router, method) {
    if (this.req.method?.toLowerCase() === method) {
      // try {
      //   await this.applyMiddlewares("*")
      //   await this.applyMiddlewares(this.req.method)
      // } catch (error) {
      //   this.res.status(500).json({ error: {} })
      // }

      router(this.req, this.res)
    }
  }
}

export default Rest

// const rest = Rest(req, res)
// rest.post(router)
