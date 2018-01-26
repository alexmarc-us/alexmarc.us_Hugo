---
title: Gmail Contact Retrieval
author: marcus
type: post
date: 2009-05-17T22:40:56+00:00
url: /code/scripting/gmail-contact-retrieval/
categories:
  - Code
  - Scripting
tags:
  - Active Directory
  - Connecticut College
  - cURL
  - Google
  - LDAP
  - XML

---
<a href="http://www.conncoll.edu/" target="_blank"><img class="alignleft wp-image-253 size-thumbnail" src="http://alexmarc.us/wp-content/uploads/2013/03/Connecticut-College-seal-150x150.jpg" alt="Connecticut College" width="150" height="150" /></a>

When Connecticut College switched its 4,000+ active email users to Gmail, the accounts needed to be converted to the new system. I wrote a script, utilizing LDAP protocol, XML, cURL, and Google’s API to accomplish this. The script authenticated the administrative user, accessed Conn’s LDAP server, copied the username/password of all student accounts, and finally added all users to Gmail’s global address book for student use.

This script was successfully utilized in the conversion process and resulted in complete data transfer between the two databases.