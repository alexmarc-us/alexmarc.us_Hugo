---
title: Active Directory to Gmail Password Update
author: marcus
type: post
date: 2009-05-17T22:53:08+00:00
url: /code/scripting/active-directory-to-gmail-password-update/
categories:
  - Code
  - Scripting
tags:
  - Active Directory
  - Connecticut College
  - Google
  - JavaScript
  - LDAP
  - MySQL
  - PHP

---
<a href="http://conncoll.edu" target="_blank"><img class="alignleft wp-image-253 size-thumbnail" src="http://alexmarc.us/wp-content/uploads/2013/03/Connecticut-College-seal-150x150.jpg" alt="Connecticut College" width="150" height="150" /></a> Once the Connecticut College email system had been [converted to Gmail][1], they needed a method to keep the users’ Active Directory passwords synced with their Gmail passwords. So, utilizing the LDAP protocol and Google’s API, I designed and implemented a web-based solution which allowed one page to simultaneously update each of these systems’ passwords.

This system was used by the ConnColl IT department for years to smoothly transfer the population to the new mail system and solve any password issues that arose.

 [1]: code/scripting/active-directory-to-gmail-password-update/