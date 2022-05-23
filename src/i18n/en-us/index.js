// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  buttons: {
    send: 'Send'
  },
  auth: {
    network_error: 'Network error. Please check your internet connection',
    submit: 'Submit',
    home: 'Home',
    navigation: 'Navigation',
    my_account: 'My account',
    administrator: {
      title: 'Administrator'
    },
    superuser: {
      title: 'Superuser',
      users: {
        users: 'Users'
      }
    },
    labels: {
      email: 'Email address',
      username: 'Username',
      name: 'Name',
      password: 'Password',
      remember_me: 'Remember me',
      repeat_password: 'Repeat password'
    },
    errors: {
      password_length:
        'The minimum length of the password is {length} characters.',
      password_match: 'Passwords do not match.',
      email: 'A valid email address is required'
    },
    login: {
      login: 'Login',
      password_forgot: 'Forgot your password?',
      verification_required:
        'Please check your email and verify your account first.',
      invalid_credentials: 'Email address or password is incorrect.',
      email: '@:auth.labels.email',
      username: '@:auth.labels.username',
      password: '@:auth.labels.password',
      remember_me: '@:auth.labels.remember_me'
    },
    register: {
      register: 'Register',
      invalid_data:
        'Server could not process the request. Please correct the sent data.',
      already_registered:
        'Email address is already registered. Please check your email for verification.',
      account_created:
        'Please check your email to verify your registration. This sometimes can take up to 10 minutes. Please check the spam folder if the email has not been received.',
      email: '@:auth.labels.email',
      name: '@:auth.labels.name',
      password: '@:auth.labels.password',
      repeat_password: '@:auth.labels.repeat_password',
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match',
        email: '@:auth.errors.email'
      },
      check_email:
        'You want to register with the email address {email}, is this correct?'
    },
    verification: {
      verification_success: 'Your e-mail has been verified. You can now login.',
      verification_failed: 'Verification has failed.'
    },
    logout: {
      logout_confirmation: 'Are you sure you want to log out?',
      confirm: 'Confirm',
      logout: 'Logout',
      cancel: 'Cancel'
    },
    password: {
      forgot: {
        header: 'Request a new password',
        check_email: 'Please check your email to reset your password.',
        email: '@:auth.labels.email'
      },
      reset: {
        header: 'Reset your password',
        success:
          'Your password has been reset. You can now login with the new password.'
      },
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match'
      }
    },
    users: {
      labels: {
        email: 'Email',
        name: 'Name'
      },
      edit_label: 'Edit',
      verify_label: 'Verify',
      verify_message: 'Are you sure you want to verify {user}?'
    }
  },
  countries: {
    index: {
      title: 'Countries'
    },
    create: {
      title: 'Create new Country'
    },
    show: {
      title: 'Detail Country'
    },
    edit: {
      title: 'Update Country'
    },
    trash: {
      title: 'Trash of Countries'
    },
    trashed: {
      title: 'Deleted Country'
    },
  },
  provinces: {
    index: {
      title: 'Provinces'
    },
    create: {
      title: 'Create new Province'
    },
    show: {
      title: 'Detail Province'
    },
    edit: {
      title: 'Update Province'
    },
    trash: {
      title: 'Trash of Provinces'
    },
    trashed: {
      title: 'Deleted Province'
    },
  },
  cities: {
    index: {
      title: 'Cities'
    },
    create: {
      title: 'Create new City'
    },
    show: {
      title: 'Detail City'
    },
    edit: {
      title: 'Update City'
    },
    trash: {
      title: 'Trash of Cities'
    },
    trashed: {
      title: null
    },
  },
  banners: {
    index: {
      title: 'Banners'
    },
    create: {
      title: 'Create new Banner'
    },
    show: {
      title: 'Detail Banner'
    },
    edit: {
      title: 'Update Banner'
    },
    trash: {
      title: 'Trash of Banners'
    },
    trashed: {
      title: null
    },
  },
  faq: {
    index: {
      title: 'F.A.Q'
    },
    create: {
      title: 'Create new F.A.Q'
    },
    show: {
      title: 'Detail F.A.Q'
    },
    edit: {
      title: 'Update F.A.Q'
    },
    trash: {
      title: 'Trash of F.A.Q'
    },
    trashed: {
      title: null
    },
  },
  terms: {
    index: {
      title: 'Terms & Conditions'
    },
    create: {
      title: 'Create new Terms & Conditions'
    },
    show: {
      title: 'Detail Terms & Conditions'
    },
    edit: {
      title: 'Update Terms & Conditions'
    },
    trash: {
      title: 'Trash of Terms & Conditions'
    },
    trashed: {
      title: null
    },
  },
  users: {
    index: {
      title: 'Users'
    },
    create: {
      title: 'Create new User'
    },
    show: {
      title: 'Detail User'
    },
    edit: {
      title: 'Update User'
    },
    trash: {
      title: 'Trash of Users'
    },
    trashed: {
      title: null
    },
  },
  teachers: {
    index: {
      title: 'Digital Partners'
    },
    create: {
      title: 'Create new Digital Partner'
    },
    show: {
      title: 'Detail Digital Partner'
    },
    edit: {
      title: 'Update Digital Partner'
    },
    trash: {
      title: 'Trash of Digital Partners'
    },
    trashed: {
      title: null
    },
  },
  students: {
    index: {
      title: 'Students'
    },
    create: {
      title: 'Create new Students'
    },
    show: {
      title: 'Detail Students'
    },
    edit: {
      title: 'Update Students'
    },
    trash: {
      title: 'Trash of Students'
    },
    trashed: {
      title: null
    },
  },
  addresses: {
    index: {
      title: 'Addresses'
    },
    create: {
      title: 'Create new Address'
    },
    show: {
      title: 'Detail Address'
    },
    edit: {
      title: 'Update Address'
    },
    trash: {
      title: 'Trash of Addresses'
    },
    trashed: {
      title: null
    },
  },
  contacts: {
    index: {
      title: 'Contacts'
    },
    create: {
      title: 'Create new Contact'
    },
    show: {
      title: 'Detail Contact'
    },
    edit: {
      title: 'Update Contact'
    },
    trash: {
      title: 'Trash of Contacts'
    },
    trashed: {
      title: null
    },
  },
  files: {
    index: {
      title: 'Files & Media'
    },
    create: {
      title: 'Upload Media'
    },
    show: {
      title: 'Detail Media'
    },
    edit: {
      title: 'Update Media'
    },
    trash: {
      title: 'Trash of Files & Media'
    },
    trashed: {
      title: null
    },
  },
  videos: {
    index: {
      title: 'Videos'
    },
    create: {
      title: 'Upload Video'
    },
    show: {
      title: 'Detail Video'
    },
    edit: {
      title: 'Update Video'
    },
    trash: {
      title: 'Trash of Videos'
    },
    trashed: {
      title: 'Deleted Video'
    },
  },
  permissions: {
    index: {
      title: 'Permissions'
    },
    create: {
      title: 'Create new Permission'
    },
    show: {
      title: 'Detail Permission'
    },
    edit: {
      title: 'Update Permission'
    },
    trash: {
      title: 'Trash of Permissions'
    },
    trashed: {
      title: null
    },
  },
  roles: {
    index: {
      title: 'Roles'
    },
    create: {
      title: 'Create new Role'
    },
    show: {
      title: 'Detail Role'
    },
    edit: {
      title: 'Update Role'
    },
    trash: {
      title: 'Trash of Roles'
    },
    trashed: {
      title: 'Deleted Role'
    },
  },
  sysparam: {
    index: {
      title: 'Sysparams'
    },
    create: {
      title: 'Create new Sysparam'
    },
    show: {
      title: 'Sysparam'
    },
    edit: {
      title: 'Update Parameter'
    },
    trash: {
      title: 'Trash of Sysparams'
    },
    trashed: {
      title: null
    },
  },
  notifications: {
    index: {
      title: 'Notifications'
    },
    create: {
      title: 'Create new Notifications'
    },
    show: {
      title: 'Detail Notification'
    },
    edit: {
      title: 'Update Notification'
    },
    trash: {
      title: 'Trash of Notifications'
    },
    trashed: {
      title: null
    },
  },
  notificationTemplates: {
    index: {
      title: 'Notification Templates'
    },
    create: {
      title: 'Create new Notification Templates'
    },
    show: {
      title: 'Notification Template'
    },
    edit: {
      title: 'Update Notification Template'
    },
    trash: {
      title: 'Trash of Notification Templates'
    },
    trashed: {
      title: null
    },
  },
  notificationFormats: {
    index: {
      title: 'Notification Formats'
    },
    create: {
      title: 'Create new Notification Formats'
    },
    show: {
      title: 'Notification Format'
    },
    edit: {
      title: 'Update Notification Format'
    },
    trash: {
      title: 'Trash of Notification Formats'
    },
    trashed: {
      title: null
    },
  },
  notificationsBroadcast: {
    index: {
      title: 'Notification Formats'
    },
    create: {
      title: 'Broadcast'
    },
    show: {
      title: 'Notification Format'
    },
    edit: {
      title: 'Update Notification Format'
    },
    trash: {
      title: 'Trash of Notification Formats'
    },
    trashed: {
      title: null
    },
  },
  degrees: {
    index: {
      title: 'Degrees'
    },
    create: {
      title: 'Create Degree'
    },
    show: {
      title: 'Detail Degree'
    },
    edit: {
      title: 'Update Degree'
    },
    trash: {
      title: 'Trash of Degrees'
    },
    trashed: {
      title: 'Deleted Degree'
    },
  },
  levels: {
    index: {
      title: 'Levels'
    },
    create: {
      title: 'Create Level'
    },
    show: {
      title: 'Detail Level'
    },
    edit: {
      title: 'Update Level'
    },
    trash: {
      title: 'Trash of Levels'
    },
    trashed: {
      title: 'Deleted Level'
    },
  },
  majors: {
    index: {
      title: 'Majors'
    },
    create: {
      title: 'Create Major'
    },
    show: {
      title: 'Detail Major'
    },
    edit: {
      title: 'Update Major'
    },
    trash: {
      title: 'Trash of Majors'
    },
    trashed: {
      title: 'Deleted Major'
    },
  },
  fields: {
    index: {
      title: 'Fields'
    },
    create: {
      title: 'Create Field'
    },
    show: {
      title: 'Detail Field'
    },
    edit: {
      title: 'Update Field'
    },
    trash: {
      title: 'Trash of Fields'
    },
    trashed: {
      title: 'Deleted Field'
    },
  },
  classes: {
    index: {
      title: 'Classes'
    },
    create: {
      title: 'Create Class'
    },
    show: {
      title: 'Detail Class'
    },
    edit: {
      title: 'Update Class'
    },
    trash: {
      title: 'Trash of Classes'
    },
    trashed: {
      title: 'Deleted Class'
    },
  },
  subjects: {
    index: {
      title: 'Subjects'
    },
    create: {
      title: 'Create Subject'
    },
    show: {
      title: 'Detail Subject'
    },
    edit: {
      title: 'Update Subject'
    },
    trash: {
      title: 'Trash of Subjects'
    },
    trashed: {
      title: 'Deleted Subject'
    },
  },
}
