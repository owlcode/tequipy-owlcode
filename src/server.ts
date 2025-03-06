import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();


const employees = [
  {
    id: "vvv1323",
    name: "John Doe",
    department: "Engineering",
    status: "ACTIVE",
    email: "some.email@wp.pl",
    equipments: [{
      id: "aaa123456",
      name: "Macbook air"
    },
    {
      id: "aaa123456",
      name: "Magic mouse"
    }
    ]
  },
  {
    id: "vvv13234",
    name: "John Doeee",
    department: "Engineering",
    status: "ACTIVE",
    email: "some.email@wp.pl",
    equipments: [{
      id: "aaa123456",
      name: "Macbook air"
    },
    {
      id: "aaa123456",
      name: "Magic mouse"
    }
    ]
  },

  {
    id: "vvv13235",
    name: "Sarah Johnson",
    department: "Marketing",
    status: "ACTIVE",
    email: "sarah.j@company.com",
    equipments: [{
      id: "bbb123456",
      name: "Dell XPS"
    },
    {
      id: "bbb123457",
      name: "Wireless Keyboard"
    }]
  },
  {
    id: "vvv13236",
    name: "Michael Chen",
    department: "Finance",
    status: "ACTIVE",
    email: "m.chen@company.com",
    equipments: [{
      id: "ccc123456",
      name: "ThinkPad X1"
    }]
  },
  {
    id: "vvv13237",
    name: "Emily Wilson",
    department: "HR",
    status: "ACTIVE",
    email: "e.wilson@company.com",
    equipments: [{
      id: "ddd123456",
      name: "iPad Pro"
    },
    {
      id: "ddd123457",
      name: "Apple Pencil"
    }]
  },
  {
    id: "vvv13238",
    name: "James Rodriguez",
    department: "Sales",
    status: "ACTIVE",
    email: "j.rodriguez@company.com",
    equipments: [{
      id: "eee123456",
      name: "Surface Pro"
    }]
  },
  {
    id: "vvv13239",
    name: "Lisa Wang",
    department: "Engineering",
    status: "ACTIVE",
    email: "l.wang@company.com",
    equipments: [{
      id: "fff123456",
      name: "MacBook Pro"
    },
    {
      id: "fff123457",
      name: "External Monitor"
    }]
  },
  {
    id: "vvv13240",
    name: "Robert Taylor",
    department: "Product",
    status: "ACTIVE",
    email: "r.taylor@company.com",
    equipments: [{
      id: "ggg123456",
      name: "Lenovo ThinkPad"
    }]
  },
  {
    id: "vvv13241",
    name: "Anna Martinez",
    department: "Design",
    status: "ACTIVE",
    email: "a.martinez@company.com",
    equipments: [{
      id: "hhh123456",
      name: "iMac"
    },
    {
      id: "hhh123457",
      name: "Wacom Tablet"
    }]
  },
  {
    id: "vvv13242",
    name: "David Kim",
    department: "Engineering",
    status: "ACTIVE",
    email: "d.kim@company.com",
    equipments: [{
      id: "iii123456",
      name: "MacBook Pro"
    },
    {
      id: "iii123457",
      name: "Magic Keyboard"
    }]
  },
  {
    id: "vvv13243",
    name: "Sophie Brown",
    department: "Marketing",
    status: "ACTIVE",
    email: "s.brown@company.com",
    equipments: [{
      id: "jjj123456",
      name: "Dell Laptop"
    }]
  },
  {
    id: "vvv13244",
    name: "Thomas Anderson",
    department: "IT",
    status: "ACTIVE",
    email: "t.anderson@company.com",
    equipments: [{
      id: "kkk123456",
      name: "ThinkPad T14"
    },
    {
      id: "kkk123457",
      name: "Docking Station"
    }]
  }
]

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Add new route handler for getting employee by ID
app.use('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  return res.json(employee);
});

app.use('/api/employees', (req, res) => {
  return res.json(employees)
})

app.post('/api/users/:id/offboard', (req, res) => {
  const employeeId = req.params.id;
  const employee = employees.find(emp => emp.id === employeeId);
  if (employee) {
    employee.status = 'OFFBOARD'
  }
  
  return res.json(employee)
})

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
