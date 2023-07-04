function CreateQuery({
  table,
  userId,
  search = null,
  sortField = null,
  sortDir = null,
  start_date = '',
  end_date = '',
  filterApp = '',
}) {
  let search_query = ''
  let sort_query = ''
  let query = ''

  switch (table) {
    case 'partnerAreaExtensions':
      let search_query_AND = ''
      if (search != null && search != '') {
        search_query += ` where (ext.Id LIKE '%${search}%' OR ext.Name LIKE '%${search}%' OR apptype.Type LIKE '%${search}%')`
        search_query_AND += ` and (ext.Id LIKE '%${search}%' OR ext.Name LIKE '%${search}%' OR apptype.Type LIKE '%${search}%')`
      }

      query = `select ext.Id as Id, apptype.Type [Type], ext.Name + case when ext.Enabled = 1 then '' else N' 🔒 (Coming soon)' end as Name, (SELECT Count(*) FROM License WHERE AppId =ext.Id AND UserId=${userId}) as Licenses
                                                    FROM [App] ext
                                                    left join AppType apptype on apptype.Id = ext.Type
                                                    ${search_query}`

      if (sortField != null && sortDir != null && sortField != 'Action') {
        query += `ORDER BY ${sortField} ${sortDir}`
      }
      break

    //

    case 'partnerAreaLicenses':
      query = `select lic.Id as Id, lic.RemoteId as RemoteId, lic.Name as Name, lic.Email as Email, st.Status as Status, ext.Name as App, appplan.Name [Plan], lic.PlanId, lic.AppId [AppId], u.Email as Creator
                                FROM [License] lic
                                inner join [User] u on u.Id = lic.UserId
                                inner join Status st on st.Id = lic.Status
                                inner join App ext on ext.Id = lic.AppId
                                left join AppPlan appplan on appplan.Id = lic.PlanId 
                                where lic.UserId=${userId}`

      if (search != null && search != '') {
        query += ` AND (lic.Id LIKE '%${search}%' OR lic.Name LIKE '%${search}%' OR lic.Email LIKE '%${search}%' OR st.Status LIKE '%${search}%' OR ext.Name LIKE '%${search}%')`
      }

      if (sortField != null && sortDir != null && sortField != 'Action') {
        if (sortField == 'Plan') {
          sortField = 'appplan.Name'
        }
        query += ` ORDER BY ${sortField} ${sortDir}`
      }
      break

    //

    case 'partnerAreaSubPartners':
      query = `select u.Id as Id, u.Name as Name, u.Email, st.Status as Status, u.Licenses as Licenses, u.Licenses - isnull(usedLicenses.Count, 0) as [LicensesAvailable]
                                FROM [User] u
                                inner join Status st on st.Id = u.Status

                                cross apply(
									select Count(l.Id) [Count]
									from License l
									where l.UserId = u.Id
								) usedLicenses

                                where u.Creator=${userId}`
      if (search != null && search != '') {
        query += ` AND (u.Email LIKE '%${search}%' OR u.Name LIKE '%${search}%' OR st.Status LIKE '%${search}%' OR Licenses LIKE '%${search}%')`
      }
      if (sortField != null && sortDir != null && sortField != 'Action') {
        query += ` ORDER BY ${sortField} ${sortDir}`
      }
      break

    //

    case 'affiliateDashboardReferrals':
      if (start_date != '' && end_date != '') {
        search_query += ` AND convert(date, u.CreateTime) >= CONVERT(DATE, '${start_date}', 21) AND convert(date, u.CreateTime) <= CONVERT(DATE, '${end_date}', 21)`
      }
      if (search != null && search != '') {
        search_query += ` AND (u.Id LIKE '%${search}%' OR Name LIKE '%${search}%' OR Email LIKE '%${search}%')`
      }
      if (sortField != null && sortDir != null) {
        sort_query += ` ORDER BY ${sortField} {sortDir}`
      }

      query = `select u.[Id],[Email],[Name],isnull(SUM(CONVERT(int,inv.[Total])),0) AS 'Commission', 1 'AffiliateLevel'
                           FROM [User] u
                           left join [Invoice] inv ON u.StripeId  = inv.CustomerId
                           where Affiliate = ${userId}${search_query}
						   group by u.[Id],[Email],[Name]

						   union

						   select u.[Id],[Email],[Name], SUM(CONVERT(int,inv.[Total])) AS 'Commission', 2 'AffiliateLevel'
						   FROM [User] u
                           left join [Invoice] inv ON u.StripeId  = inv.CustomerId
                           where Affiliate IN (select Id from [User] where Affiliate = ${userId})
						   ${search_query}
                           group by u.[Id],[Email],[Name]${sort_query}`
      break

    //

    case 'affiliateDashboardTransaction':
      if (start_date != '' && end_date != '') {
        search_query += ` AND convert(date, inv.Created) >= CONVERT(DATE, '${start_date}', 21) AND convert(date, inv.Created) <= CONVERT(DATE, '${end_date}', 21)`
      }
      if (search != null && search != '') {
        search_query +=
          ` AND (inv.Created LIKE '%${search}%' OR inv.Description LIKE '%${search}%' OR inv.Total LIKE '%${search}%'` +
          ` OR Email LIKE '%${search}%' OR Name LIKE '%${search}%')`
      }

      query = `SELECT inv.[Id], [Created], [Description], [Total], [Name], [Email], 1 'AffiliateLevel' FROM [Invoice] 
                        inv inner join [User] u ON u.StripeId  = inv.CustomerId
                        where u.Affiliate = ${userId}${search_query}

						union 

						SELECT inv.[Id], [Created], [Description], [Total], [Name], [Email], 2 'AffiliateLevel' FROM [Invoice] 
                        inv inner join [User] u ON u.StripeId  = inv.CustomerId
                        where u.Affiliate IN (select Id from [User] where Affiliate = ${userId})${search_query}`

      if (sortField != null && sortDir != null && sortField != 'Action') {
        if (sortField == 'TotalString') {
          sortField = 'Total'
        }

        query += ` ORDER BY ${sortField} ${sortDir}`
      }
      break
  }

  return query
}

module.exports = CreateQuery
