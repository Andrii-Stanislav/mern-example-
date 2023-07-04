const compareDates = (dbDate, currentDate) => {
  return (
    +`${dbDate}`.slice(0, 4) > +`${currentDate}`.slice(0, 4) ||
    +`${dbDate}`.slice(5, 7) > +`${currentDate}`.slice(5, 7) ||
    +`${dbDate}`.slice(8, 10) > +`${currentDate}`.slice(8, 10) ||
    +`${dbDate}`.slice(11, 13) > +`${currentDate}`.slice(11, 13) ||
    +`${dbDate}`.slice(14, 16) > +`${currentDate}`.slice(14, 16) ||
    +`${dbDate}`.slice(17, 19) > +`${currentDate}`.slice(17, 19)
  )
}

module.exports = compareDates
