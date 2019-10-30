const events = require('./calendar.json')
/**
 *
 * Goal of this function: edit an event, by a specific user
 */
function editEvent (req, res, next) {
  try {
    if (!req.session.user) {
      // ici on râle
      const err = new Error('No user was given')
      err.status = 401
      throw err
    }

    // ici récupérer l'event
    const event = events.find(e => e.id === parseInt(req.params.id))

    if (!event) {
      const err = new Error('The event was not found')
      err.status = 404
      throw err
    }
    // ici checker l'owner
    if (event.owner !== req.session.user.name) {
      const err = new Error('The event is not yours')
      err.status = 401
      throw err
    }

    // modifier correctement l'event
    const { title } = req.body
    event.title = title
    // renvoyer l'event
    res.json(event)
  } catch (err) {
    next(err)
  }
}

module.exports = editEvent
