// Edit this file to add/change topics. No other code changes needed.
window.KT = [
  {
    "id": "xirr-web",
    "name": "Xirr Web App",
    "kind": "Web",
    "summary": "Frontend knowledge transfer. One React single-page app, one REST backend, three user roles. Nearly every bug so far sits in the contract between the two (user id vs client id, /me/ vs /{clientId}/ endpoints, token refresh), not in the UI.",
    "owner": "Abinaya B.",
    "status": "active",
    "updated": "2026-11-10",
    "stack": [
      "React 19",
      "TypeScript",
      "Vite 7",
      "Tailwind CSS v4",
      "React Query",
      "Axios",
      "Recharts"
    ],
    "related": [
      "xirr-mobile",
      "investigo"
    ],
    "links": [
      {
        "label": "Repo",
        "url": "#"
      },
      {
        "label": "Live app",
        "url": "#"
      }
    ],
    "intro": [
      {
        "p": "<b>Frontend knowledge transfer.</b> One React single-page app, one REST backend, three user roles. Nearly every bug so far sits in the contract between the two (user id vs client id, <code>/me/</code> vs <code>/{clientId}/</code> endpoints, token refresh), not in the UI. Confidential, for Xerago internal handover."
      },
      {
        "table": {
          "head": [
            "Modules",
            "API endpoint exports",
            "User roles",
            "Global contexts",
            "Required env vars"
          ],
          "rows": [
            [
              "13",
              "161",
              "3 (client, admin/HOD/RM, CSM)",
              "3",
              "1"
            ]
          ]
        }
      }
    ],
    "sections": [
      {
        "title": "At a glance",
        "parts": [
          {
            "p": "All portfolio data is server state cached by React Query; the browser itself keeps only tokens, currency and the selected family member. One axios client carries every call, so most incidents trace back to it. The diagram shows how the pieces connect."
          },
          {
            "img": {
              "src": "screenshots/from-pdf/architecture.png",
              "cap": "App architecture · 6 components"
            }
          }
        ]
      },
      {
        "title": "Overview and roles",
        "parts": [
          {
            "p": "The XIRR web app is a React 19 + Vite single-page application where investors see portfolio performance (XIRR returns, holdings, gains and losses, dividends, news) and download statements, and where staff (RM / HOD / ADMIN / CSM) manage clients, families, transactions and documents. It also hosts \"Investigo\", an AI-assisted equity research reader. This document covers the frontend only; the API is owned by the backend team."
          },
          {
            "table": {
              "head": [
                "Item",
                "Detail"
              ],
              "rows": [
                [
                  "Purpose",
                  "Web access to portfolio, strategy and report data; back-office tools for client management"
                ],
                [
                  "Users",
                  "Clients / investors, and staff roles RM, HOD, ADMIN, CSM"
                ],
                [
                  "Platform",
                  "Web (desktop browser SPA), built with Vite into static files"
                ],
                [
                  "Key capabilities",
                  "INR / USD currency toggle, family-member switcher, strategy and stock drill-down, statements and month-end reports (PDF / Excel downloads), news and announcements, Investigo research, document vault, admin read-only client view"
                ],
                [
                  "Related project",
                  "XIRR Mobile App (Expo / React Native) uses the same REST API"
                ]
              ]
            }
          },
          {
            "p": "<b>Roles and landing pages</b>"
          },
          {
            "table": {
              "head": [
                "Role",
                "Lands on",
                "Access"
              ],
              "rows": [
                [
                  "Client / investor",
                  "<code>/welcome</code>, then <code>/overview</code>",
                  "Own portfolio, family members, reports, research, upload, settings; can edit own data"
                ],
                [
                  "ADMIN, HOD, RM",
                  "<code>/admin-dashboard</code>",
                  "Admin layout: clients, families, transactions, vault, documents; read-only view of a client portfolio"
                ],
                [
                  "CSM",
                  "<code>/admin/clients</code>",
                  "Same admin layout, lands on client management"
                ]
              ]
            }
          },
          {
            "p": "Redirect logic is in <code>src/components/shared/RoleBasedRedirect.tsx</code>; the role comes from the JWT <code>role</code> claim."
          }
        ]
      },
      {
        "title": "Technology stack",
        "parts": [
          {
            "p": "Versions are the ranges in <code>package.json</code>."
          },
          {
            "table": {
              "head": [
                "Area",
                "Technology",
                "Version",
                "Used for"
              ],
              "rows": [
                [
                  "UI",
                  "React",
                  "^19.1.0",
                  "Components (StrictMode on)"
                ],
                [
                  "Language",
                  "TypeScript",
                  "~5.8.3",
                  "Typing; many files still use <code>any</code>"
                ],
                [
                  "Build",
                  "Vite",
                  "^7.0.4",
                  "Dev server, bundling, code-splitting"
                ],
                [
                  "Styling",
                  "Tailwind CSS v4 (<code>@tailwindcss/vite</code>)",
                  "^4.1.12",
                  "Utility styling, plus <code>src/styles</code> CSS"
                ],
                [
                  "Routing",
                  "react-router-dom",
                  "^7.8.2",
                  "Client routing, lazy routes"
                ],
                [
                  "Server state",
                  "@tanstack/react-query",
                  "^5.90.5",
                  "API caching and retries"
                ],
                [
                  "HTTP",
                  "axios",
                  "^1.14.0",
                  "<code>apiClient</code> with JWT and refresh interceptors"
                ],
                [
                  "Charts",
                  "recharts",
                  "^3.1.2",
                  "All dashboards and graphs"
                ],
                [
                  "Animation",
                  "framer-motion",
                  "^12.23.12",
                  "Transitions"
                ],
                [
                  "UI helpers",
                  "lucide-react, sonner, class-variance-authority",
                  "^0.541.0, ^2.0.7, ^0.7.1",
                  "Icons, toasts, variants"
                ],
                [
                  "Auth",
                  "jwt-decode",
                  "^4.0.0",
                  "Read <code>client_id</code> and <code>role</code> from the token"
                ],
                [
                  "Minifier",
                  "terser",
                  "^5.44.0",
                  "Drops <code>console.*</code> in production"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "Architecture and key decisions",
        "parts": [
          {
            "p": "The app is a static React SPA. Pages are lazy-loaded, server data goes through React Query, and every authenticated call goes through one axios client that attaches the JWT and refreshes it on 401. A few older files still call <code>fetch</code> directly (see section 11)."
          },
          {
            "p": "<b>Key decisions</b>"
          },
          {
            "ul": [
              "<b>Feature folders:</b> code is grouped by user area (<code>investor</code>, <code>management</code>, <code>shared</code>), not by file type.",
              "<b>Provider order in </b><b>App.tsx</b><b>:</b> QueryClientProvider, Router, UserProvider, FamilyDataProvider, CurrencyProvider, AppRoutes. FamilyDataProvider uses React Query, so it must stay inside QueryClientProvider.",
              "<b>One endpoint file:</b> every URL is built in <code>src/api.ts</code> through <code>apiUrl()</code>; the app throws at start-up if <code>VITE_API_BASE_URL</code> is missing.",
              "<b>me</b><b> vs client endpoints:</b> a client viewing their own data calls <code>/.../me/...</code>; an admin viewing a client calls <code>/.../{clientId}/...</code>. Query keys carry an <code>isMe</code> flag.",
              "<b>Read-only admin view:</b> <code>/client/:clientId/overview</code> renders the same <code>OverviewPage</code>; <code>usePermissions()</code> switches write actions off when <code>viewMode</code> is <code>admin_readonly</code>."
            ],
            "ordered": false
          },
          {
            "p": "<b>React Query defaults (</b><b>App.tsx</b><b>)</b>"
          },
          {
            "table": {
              "head": [
                "Option",
                "Value",
                "Meaning"
              ],
              "rows": [
                [
                  "staleTime",
                  "5 min",
                  "Data is fresh for 5 minutes"
                ],
                [
                  "gcTime",
                  "10 min",
                  "Unused cache kept 10 minutes"
                ],
                [
                  "refetchOnWindowFocus",
                  "false",
                  "No refetch on tab focus"
                ],
                [
                  "refetchOnMount",
                  "false",
                  "Cached data reused on mount"
                ],
                [
                  "retry",
                  "1",
                  "One retry on failure"
                ],
                [
                  "networkMode",
                  "always",
                  "Queries run even if the browser reports offline"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "Project structure",
        "parts": [
          {
            "p": "Everything lives under <code>src/</code>; code is grouped by user area first, then by type."
          },
          {
            "code": "XIRR-Portfolio/\n  index.html, vite.config.ts, tailwind.config.js, tsconfig*.json\n  .env                      VITE_API_BASE_URL\n  public/  dist/            static files, build output\n  src/\n    main.tsx, App.tsx       entry, providers, React Query client\n    api.ts                  all endpoint URL builders (161 exports)\n    routes/AppRoutes.tsx    route table (public, admin, client)\n    contexts/               UserContext, FamilyDataContext, CurrencyContext\n    hooks/                  useApi, usePermissions, useViewingContext, useNavigationWithLoader\n    utils/                  apiClient, auth, navigationSync, familyTreeUtils, logger, mediaUtils\n    types/                  client.ts, family.ts, report.ts\n    styles/                 index.css (Tailwind entry), App.css\n    components/\n      layout/               Header, Header1 (admin), Sidebar1 (admin), SidebarNav (client),\n                            AdminLayout, ScrollToTop, footer/\n      shared/               RoleBasedRedirect\n      ui/                   loaders, TransactionForm, FileUploadComponent, AdminViewBanner\n    features/\n      shared/               auth/, notifications/, profile/\n      investor/             dashboard/, analytics/, reports/, research/, intents/, tax-savings/\n      management/           dashboard/, clients/, transactions/, vault/"
          },
          {
            "p": "<b>Key files to read first</b>"
          },
          {
            "table": {
              "head": [
                "File",
                "Why it matters"
              ],
              "rows": [
                [
                  "<code>src/api.ts</code>",
                  "Single source of truth for endpoints; throws if <code>VITE_API_BASE_URL</code> is missing"
                ],
                [
                  "<code>src/utils/apiClient.ts</code>",
                  "Axios instance with token injection and 401 refresh queue"
                ],
                [
                  "<code>src/contexts/UserContext.tsx</code>",
                  "Login, logout, role, <code>client_id</code>, selected family member"
                ],
                [
                  "<code>src/utils/navigationSync.ts</code>",
                  "Keeps the selected member in sessionStorage and repairs it on tab refocus"
                ],
                [
                  "<code>src/hooks/useApi.ts</code>",
                  "React Query hooks and the <code>queryKeys</code> factory"
                ],
                [
                  "<code>src/routes/AppRoutes.tsx</code>",
                  "Complete route list"
                ],
                [
                  "<code>features/investor/dashboard/OverviewPage.tsx</code>",
                  "Main investor screen (about 1.8k lines)"
                ],
                [
                  "<code>features/investor/analytics/RiskCompassStrategy.tsx</code>",
                  "Strategies screen, largest file (about 4.6k lines)"
                ],
                [
                  "<code>features/investor/research/</code>",
                  "Investigo module: api, components, context, data, hooks"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "Setup and local run",
        "parts": [
          {
            "p": "<b>Prerequisites</b>"
          },
          {
            "ul": [
              "Node.js 20.19+ or 22.12+ (Vite 7 requirement; verify against your install) and npm",
              "Git access to the repository and VS Code",
              "A reachable backend API"
            ],
            "ordered": false
          },
          {
            "p": "<b>Setup commands</b>"
          },
          {
            "code": "git clone <repository-url>\ncd XIRR-Portfolio\nnpm install\n# create or edit .env (below)\nnpm run dev        # http://localhost:5173"
          },
          {
            "p": "<b>Environment variables</b>"
          },
          {
            "table": {
              "head": [
                "Variable",
                "Required",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>VITE_API_BASE_URL</code>",
                  "Yes",
                  "Backend base URL (production: https://xirr.ai). Investigo is hosted on the same host, so this is the only variable. The app throws \"VITE_API_BASE_URL is not defined\" without it (<code>api.ts</code>, <code>mediaUtils.ts</code>)"
                ]
              ]
            }
          },
          {
            "p": "The checked-in <code>.env</code> has several commented-out URLs for other environments; keep exactly one <code>VITE_API_BASE_URL</code> line active. Vite reads <code>.env</code> at start-up, so restart the dev server after editing."
          },
          {
            "p": "For local work, point <code>VITE_API_BASE_URL</code> at the port-8000 dev backend: the production domain's CORS policy does not allow <code>http://localhost:5173</code> (confirmed by the tech lead). Do not add a Vite proxy to hide CORS problems; fix them on the backend."
          },
          {
            "p": "<b>npm scripts</b>"
          },
          {
            "table": {
              "head": [
                "Command",
                "Action"
              ],
              "rows": [
                [
                  "<code>npm run dev</code>",
                  "Vite dev server on port 5173 (opens the browser)"
                ],
                [
                  "<code>npm run build</code>",
                  "Production build into <code>dist/</code>"
                ]
              ]
            }
          },
          {
            "p": "<code>build</code> is <code>vite build</code> only. It does not run <code>tsc</code>, so type errors do not fail the build."
          }
        ]
      },
      {
        "title": "Application workflow",
        "parts": [
          {
            "p": "<b>Login and session</b>"
          },
          {
            "ul": [
              "The user opens <code>/</code> (LoginCard) and submits username and password: <code>POST /api/v1/auth/login</code>.",
              "The response holds <code>access_token</code> and <code>refresh_token</code>. <code>sessionStorage</code> is cleared first, and a deliberate 3-second delay runs before the app continues (an original UI requirement).",
              "<code>UserContext.login()</code> saves both tokens to localStorage and decodes the JWT for <code>client_id</code> and <code>role</code>. If <code>client_id</code> is missing it calls <code>GET /api/v1/clients/me</code>. The JWT <code>sub</code> is a user id, not a client id; never use it as one.",
              "<code>clientId</code>, <code>userRole</code> and <code>username</code> go to sessionStorage, then the app navigates to <code>/welcome</code>.",
              "Role redirect: investors to <code>/overview</code>; ADMIN, HOD and RM to <code>/admin-dashboard</code>; CSM to <code>/admin/clients</code>.",
              "<code>UserProvider</code> then calls <code>/clients/me</code> for <code>displayName</code> and <code>welcomeName</code>."
            ],
            "ordered": true
          },
          {
            "p": "<b>Token refresh</b>"
          },
          {
            "ul": [
              "Every request gets <code>Authorization: Bearer &lt;access_token&gt;</code> from localStorage.",
              "On a 401, <code>apiClient</code> posts the refresh token to <code>/api/v1/auth/refresh</code> once; parallel 401s are queued and replayed after it finishes.",
              "If the refresh fails, tokens are cleared and the browser goes to <code>/</code>."
            ],
            "ordered": true
          },
          {
            "p": "<b>Investor journey</b>"
          },
          {
            "table": {
              "head": [
                "Route",
                "Screen"
              ],
              "rows": [
                [
                  "<code>/</code> , <code>/welcome</code>",
                  "Login, welcome"
                ],
                [
                  "<code>/overview</code>",
                  "Portfolio summary, family switcher, currency toggle"
                ],
                [
                  "<code>/dashboard</code>",
                  "Strategy and stock dashboards, performers, graphs"
                ],
                [
                  "<code>/strategies</code>",
                  "Risk Compass strategy analytics"
                ],
                [
                  "<code>/upload</code>, <code>/transactions</code>",
                  "File upload, manual transaction form"
                ],
                [
                  "<code>/reports</code>",
                  "Statements and month-end reports (PDF and Excel files come from the backend)"
                ],
                [
                  "<code>/news-events</code>",
                  "Announcements, dividends, corporate actions"
                ],
                [
                  "<code>/research</code>, <code>/research-agent</code>",
                  "Investigo research"
                ],
                [
                  "<code>/order</code>, <code>/notifications</code>, <code>/change-password</code>",
                  "Order intents, alerts, password"
                ],
                [
                  "<code>/survey</code>, <code>/calculator</code>",
                  "Tax-savings (public)"
                ]
              ]
            }
          },
          {
            "p": "<b>Admin / RM journey</b>"
          },
          {
            "table": {
              "head": [
                "Route",
                "Screen"
              ],
              "rows": [
                [
                  "<code>/admin-dashboard</code>",
                  "Staff dashboard"
                ],
                [
                  "<code>/admin/clients</code>, <code>/admin/client</code>, <code>/admin/family</code>",
                  "Client list, profile, family detail"
                ],
                [
                  "<code>/admin/add-client</code>, <code>add-family</code>, <code>add-family-combined</code>, <code>add-manager</code>",
                  "Onboarding forms"
                ],
                [
                  "<code>/admin/transactions</code> , <code>transactions-folder</code>, <code>transaction-docs</code>, <code>transaction-list</code>",
                  "Transaction browsing"
                ],
                [
                  "<code>/admin/add-transaction</code>, <code>/admin/client/:clientId/transaction/:txnId/edit</code>",
                  "Create and edit a transaction"
                ],
                [
                  "<code>/admin/vault</code>, <code>vault-folder</code>, <code>vault-upload</code>, <code>documents</code>",
                  "Document vault"
                ],
                [
                  "<code>/admin/client-view</code>, <code>/client/:clientId/overview</code>",
                  "Read-only client portfolio"
                ],
                [
                  "<code>/admin/settings</code>",
                  "Settings"
                ]
              ]
            }
          },
          {
            "p": "<b>Family-member selection.</b> The selected member is stored in sessionStorage (<code>selectedUserId</code> and related keys), not in the URL. <code>NavigationSync</code> restores it after a refresh and when the tab becomes visible again. Logout clears these keys; stale keys would show the next user the wrong profile."
          }
        ]
      },
      {
        "title": "Screens and URLs",
        "parts": [
          {
            "p": "The app is hosted at <code>https://xirr.ai</code>; each page below is a path on that host. Login is the root path: <code>/login</code> is not a defined route and falls through to <code>RoleBasedRedirect</code>. Purposes are read from the code, so confirm the wording with the product owner."
          },
          {
            "table": {
              "head": [
                "#",
                "Page",
                "URL",
                "Purpose",
                "Main components"
              ],
              "rows": [
                [
                  "1",
                  "Login",
                  "<code>https://xirr.ai/</code>",
                  "Sign in with username and password; stores tokens and routes by role. Password reset starts at <code>/forgot-password</code>.",
                  "<code>LoginCard</code>"
                ],
                [
                  "2",
                  "Welcome",
                  "<code>https://xirr.ai/welcome</code>",
                  "Animated greeting after login, then redirects: client to <code>/overview</code>, admin to <code>/admin-dashboard</code>, CSM to <code>/admin/clients</code>.",
                  "<code>WelcomePage</code> (reads the name via <code>clientsMeUrl</code>)"
                ],
                [
                  "3",
                  "Overview",
                  "<code>https://xirr.ai/overview</code>",
                  "Family / profile card with a preview of total portfolio value, change from last month and strategy XIRR; INR / USD toggle. Admins see the same page read-only at <code>/client/:clientId/overview</code>.",
                  "<code>OverviewPage</code>, <code>Header</code>, <code>AdminViewBanner</code>"
                ],
                [
                  "4",
                  "Dashboard",
                  "<code>https://xirr.ai/dashboard</code>",
                  "Dashboard of allocation by strategy, portfolio and stock performance (best, worst, top gainers and losers), latest updates and a performance graph.",
                  "<code>Dasboardv3</code>, <code>AssetStrategiesChart</code>, <code>PortfolioDashboard</code>, <code>StockDashboard</code>, <code>Updates</code>, <code>GraphComponent</code>, <code>SidebarNav</code>"
                ],
                [
                  "5",
                  "Strategies",
                  "<code>https://xirr.ai/strategies</code>",
                  "Per-strategy holdings, gain / loss and dividends, with a stock drill- down (Transactions, Returns, Compare, Announcements).",
                  "<code>RiskCompassStrategy</code> (~4.6k lines), <code>GraphComponent</code>, strategy hooks in <code>useApi.ts</code>"
                ],
                [
                  "6",
                  "Upload",
                  "<code>https://xirr.ai/upload</code>",
                  "Upload a transaction or contract- note file (<code>.csv</code>, <code>.xlsx</code>), download the template and review the extracted data.",
                  "<code>FileUploadComponent</code>"
                ],
                [
                  "7",
                  "Transactions",
                  "<code>https://xirr.ai/transactions</code>",
                  "Manual transaction entry form: Asset Details, Transaction Details, Taxes &amp; Other Charges.",
                  "<code>TransactionForm</code>"
                ],
                [
                  "8",
                  "News &amp; Events",
                  "<code>https://xirr.ai/news-events</code>",
                  "Feed of announcements, corporate actions, dividends and transactions for the client's holdings.",
                  "<code>Updates</code> (<code>AlertsFeed</code>)"
                ],
                [
                  "9",
                  "Reports",
                  "<code>https://xirr.ai/reports</code> (also <code>/report</code>)",
                  "Generate and download Portfolio, Gain/Loss, Dividend, Tax Statement and Transaction reports, and month-end reports. Files come from the backend.",
                  "<code>ReportsPage</code>"
                ],
                [
                  "10",
                  "Research",
                  "<code>https://xirr.ai/research</code>",
                  "Investigo research reader: search, feed, metrics and agent panels, company reader.",
                  "<code>InvestigoPage</code>, <code>ResearchPage</code> (Home, Reader, Shell, Navigation)"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "Screenshots and component guide",
        "parts": [
          {
            "p": "Every screen below shows its screenshot, what the screen is for, and what each visible component does. Screenshots come from a test account. On all investor pages except Login, Welcome and Research the shared shell is: the sidebar (<code>SidebarNav.tsx</code>, icons in order Overview, Dashboard, Strategies, Upload, Reports, News &amp; Events, Research, then Sign Out), the header (<code>Header.tsx</code>: profile avatar and name, Swap profile, Currency dropdown, notification bell) and the footer (<code>Footer.tsx</code>: Terms of Service, Privacy Policy, Disclaimer, contact email, copyright)."
          },
          {
            "h": "1. Login: <code>https://xirr.ai/</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/login.png",
              "cap": "Login, credentials being entered"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Entry point of the portal. The user enters a username and password and signs in; a \"Forgot Password?\" link starts the reset flow."
          },
          {
            "p": "<b>Components</b> (<code>LoginCard.tsx</code>):"
          },
          {
            "ul": [
              "XIRR logo: brand mark at the top of the card.",
              "Title and subtitle (\"Login / Enter your credentials\"): tells the user what to do.",
              "Username field with user icon: login identifier.",
              "Password field with lock icon and show/hide eye toggle (masked): secret input.",
              "Sign In button: submits the credentials.",
              "\"Forgot Password?\" link: opens the password reset page (<code>ForgotPasswordCard.tsx</code>, route <code>/forgot-password</code>).",
              "Decorative dots and ring background: styling only.",
              "Sidebar, header, bell and currency dropdown are not shown before login."
            ],
            "ordered": false
          },
          {
            "h": "2. Welcome: <code>https://xirr.ai/welcome</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Welcome.png",
              "cap": "Welcome splash"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Short animated greeting shown right after login. It shows the profile's welcome name, then moves on automatically (investors go to <code>/overview</code>) without any user action."
          },
          {
            "p": "<b>Components</b> (<code>WelcomePage.tsx</code>):"
          },
          {
            "ul": [
              "\"Welcome to\" animated text: greeting line.",
              "XIRR logo: brand mark.",
              "Welcome name with underline accent: personalised greeting for the logged-in family profile.",
              "Corner frame lines and soft gradient background: styling only.",
              "No sidebar, header or buttons on this screen."
            ],
            "ordered": false
          },
          {
            "h": "3. Overview: <code>https://xirr.ai/overview</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Overview.png",
              "cap": "Overview, profile / family selection view"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Landing view after the welcome splash. The user sees the family group card and its member profile card, with a preview of total portfolio value, and picks who to view. The preview card hints that clicking it opens the detailed view."
          },
          {
            "p": "<b>Components</b> (<code>OverviewPage.tsx</code>, route <code>/overview</code>, component name <code>FinancialDashboard</code>):"
          },
          {
            "ul": [
              "XIRR logo (top left): brand mark.",
              "Currency dropdown (top right): switches the display currency (<code>Header.tsx</code> via <code>CurrencyContext</code>).",
              "Notification bell (top right): opens alerts and notifications.",
              "Family group card (group name and large initials circle): represents the family group in the family tree.",
              "Tilted portfolio preview card: member name, total portfolio value, change from last month, and a strategy mini-card with XIRR, Sharpe ratio and a benchmark comparison line."
            ],
            "ordered": false
          },
          {
            "h": "4. Dashboard: <code>https://xirr.ai/dashboard</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Dashboard1.png",
              "cap": "Dashboard, top of page"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Main portfolio summary. The user sees total portfolio value, the month's gain, a performance line chart and the top strategies, then scrolls for details."
          },
          {
            "p": "<b>Components</b> (<code>Dasboardv3.tsx</code>):"
          },
          {
            "ul": [
              "Sidebar (Dashboard icon active): navigation (<code>SidebarNav.tsx</code>).",
              "Header with profile, Swap profile, Currency dropdown and bell (<code>Header.tsx</code>).",
              "Total Portfolio block (value, Month's Gain amount and percent badge): headline numbers (<code>PortfolioDashboard.tsx</code>).",
              "Portfolio value line chart: value over time (<code>PortfolioDashboard.tsx</code>).",
              "Top Strategies list (strategy name with XIRR): best strategies at a glance (<code>PortfolioDashboard.tsx</code>).",
              "Snapshot card: allocation by asset type (<code>AssetStrategiesChart.tsx</code>).",
              "Strategy detail card (name, XIRR / Sharpe Ratio / Invested / Current Value tiles, Benchmark dropdown, chart): <code>GraphComponent.tsx</code> (<code>InvestmentDashboard</code>)."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Dashboard2.png",
              "cap": "Dashboard, scrolled to Snapshot and strategy chart"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows how the portfolio is allocated and how a strategy compares with its benchmark over time."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Snapshot card: single bar with the asset class, share percentage and strategy count (<code>AssetStrategiesChart.tsx</code>).",
              "Strategy card with four metric tiles (XIRR, Sharpe Ratio, Invested, Current Value): key numbers (<code>GraphComponent.tsx</code>, <code>MetricCard</code>).",
              "Benchmark dropdown and legend (strategy vs index): chooses and labels the comparison line (<code>GraphComponent.tsx</code>).",
              "NAV line chart with date axis: strategy NAV against benchmark NAV over time.",
              "Tab strip (Dividend, Transaction, Corp. Action, Announcement) at the bottom: alert categories (<code>Updates2.tsx</code>).",
              "Sidebar: navigation. Header is scrolled out of view."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Dashboard3.png",
              "cap": "Dashboard, scrolled to alerts and Market Movers"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows recent portfolio events and the best and worst movers among the holdings."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Alerts card with tabs Dividend / Transaction / Corp. Action / Announcement (Dividend active): recent events for the holdings (<code>Updates2.tsx</code>, <code>DividendRow</code>).",
              "Dividend rows (company, dividend type and rate, record date, amount, ticker): individual dividend alerts.",
              "\"Showing 3 of 23 dividends\" text and \"Show more\" button: pagination of the list.",
              "Market Movers card with four tables (Best Performers, Worst Performers, Today's Top Gainers, Today's Top Losers): holding-level movers (<code>StockDashboard.tsx</code>: <code>BestPerformer</code>, <code>WorstPerformer</code>, <code>TopGainer</code>, <code>TopLoser</code>)."
            ],
            "ordered": false
          },
          {
            "h": "5. Strategies: <code>https://xirr.ai/strategies</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy1.png",
              "cap": "Strategies, top of page"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Detailed view of one investment strategy. The user compares the portfolio's risk and return numbers against the NIFTY 50 benchmark and sees the NAV chart before reading the holdings."
          },
          {
            "p": "<b>Components</b> (<code>RiskCompassStrategy.tsx</code>):"
          },
          {
            "ul": [
              "Sidebar (Strategies icon active) and header (profile, Swap profile, Currency, bell).",
              "Strategy selector (dropdown with the strategy's full-name chip): chooses which strategy to show.",
              "\"Back to Dashboard\" link: returns to <code>/dashboard</code>.",
              "Metrics table (XIRR, Sharpe Ratio, Drawdown, Current NAV for Portfolio and NIFTY 50): risk and return comparison (<code>GraphComponent.tsx</code>, <code>MetricTable</code>).",
              "Benchmark dropdown, legend and NAV line chart: strategy NAV against the benchmark over time.",
              "Statement toggle (Holding Statement / Gain/Loss Statement): switches the table below.",
              "\"Add Transactions\" button: opens the transaction entry flow.",
              "\"Download Report\" button: downloads the statement.",
              "Holding summary card (number of instruments, gainers and losers, Total Investment, Current Value, day change, Unrealized P&amp;L): summary of the holdings."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy2.png",
              "cap": "Strategies, Holding Statement table"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lists each stock held in the strategy with price, day change, quantity, invested amount, current value, return and XIRR so the user can see what is working."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Statement toggle, \"Add Transactions\" and \"Download Report\" buttons.",
              "Summary card: instruments count, gainers and losers, Total Investment, Current Value, day gain, Unrealized P&amp;L.",
              "Holdings table (Stock Name, Live Price, Day's Gain / % Change, Quantity / Cost per Unit, Invested Amt / Weight, Current Value / Weight, Return / % Returns, XIRR, Graph (3 Months)): sortable column headers; one row per stock with an expand arrow and a document icon; <code>MiniGraph</code> sparkline per row.",
              "Table scrollbar: scrolls the rows.",
              "Footer: Terms of Service, Privacy Policy, Disclaimer, contact email, copyright."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-transaction.png",
              "cap": "Strategies, one holding expanded, Transactions tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows the buy and sell history behind a single holding."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Summary card and holdings table header (as above).",
              "Expanded row with tab bar: Transactions, Dividend History, Announcements, Returns, Compare (Transactions active): <code>RiskCompassStrategy.tsx</code>.",
              "Transaction table (Date, Type badge, Quantity / Cost per Unit, Charges, Net Amount, Returns / % Returns, Holding Units): <code>TransactionHistory</code>.",
              "Next holding row (collapsed) below."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-dividend.png",
              "cap": "Strategies, holding, Dividend History tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows dividends received on this holding."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Same expanded-row tab bar (Dividend History active).",
              "Dividend table (Record Date, Dividend Rate, Quantity, Amount Received with info icon): <code>DividendHistory</code>."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-announcements.png",
              "cap": "Strategies, holding, Announcements tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows company filings for the holding with a short summary and a link to the source."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Same expanded-row tab bar (Announcements active).",
              "Announcements table (Date, Category, Summary with its own scrollbar, Source URL \"View\" link): <code>Announcements</code>.",
              "Table scrollbar: scrolls the rows."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-returns.png",
              "cap": "Strategies, holding, Returns tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows the stock's return over different periods."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Same expanded-row tab bar (Returns active).",
              "Five return tiles (1-Day, 1-Week, 1-Month, 3-Months, 1-Year; green for positive, red for negative): <code>Returns</code>."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-compare.png",
              "cap": "Strategies, holding, Compare tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Compares the stock against market indices on XIRR, Sharpe ratio and drawdown, with a chart."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Same expanded-row tab bar (Compare active).",
              "\"Comparison Analysis\" heading with the stock name.",
              "Comparison table (Stock Name, XIRR (%), Sharpe Ratio, Drawdown (%), rows for the stock and indices): <code>CompareTab</code>.",
              "Multi-line comparison chart with date axis and legend: stock against indices over time."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-Gainloss.png",
              "cap": "Strategies, Gain/Loss Statement"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows realised profit and loss on stocks that were sold."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Statement toggle (Gain/Loss Statement active), \"Add Transactions\" and \"Download Report\" buttons.",
              "Summary card (Total Transactions, gainers and losers, Total Invested, Total Sale Value, Total Realized Gain and percent).",
              "Gain/Loss table (Stock Name, Qty, Purchase, Pur Value, Sale, Sale Value, Realized Gain, Dividend Received with info icon, XIRR %): sortable; rows are expandable.",
              "NAV chart axis labels and Current NAV tiles at the top edge: page is scrolled partway."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-GL-Transaction.png",
              "cap": "Strategies, Gain/Loss, row expanded, Transactions"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows the purchase and sale lines behind one realised gain."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Gain/Loss summary card and table header.",
              "Expanded row sub-tabs (Transactions active, Dividend History).",
              "Transaction detail table (Stock Name, Qty, Purchase with date, Pur Value, Sale with date, Sale Value, Realized Gain, Dividend Received, XIRR %)."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Strategy-GL-Dividend.png",
              "cap": "Strategies, Gain/Loss, row expanded, Dividend History (empty)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows dividends received on a sold stock; here there are none."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Expanded row sub-tabs (Dividend History active).",
              "Dividend table (Record Date, Dividend Rate, Quantity, Amount Received) with the empty-state message \"No dividend history available\"."
            ],
            "ordered": false
          },
          {
            "h": "6. Upload: <code>https://xirr.ai/upload</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Upload.png",
              "cap": "Upload, file upload"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lets the user add transactions by uploading a statement file, or choose to enter them manually or download a template first."
          },
          {
            "p": "<b>Components</b> (<code>FileUploadComponent.tsx</code>):"
          },
          {
            "ul": [
              "Sidebar (Upload icon active) and header (profile, Swap profile, Currency, bell).",
              "\"Back to Strategies\" link: returns to <code>/strategies</code>.",
              "Drag-and-drop zone (cloud upload icon, \"Drag and drop files here\", supported types and size note): drop area.",
              "\"Upload Files\" button: opens the file chooser.",
              "\"or\" divider and \"Enter manually\" button: goes to the manual transaction form (<code>/transactions</code>).",
              "\"Download template\" link: downloads the upload template."
            ],
            "ordered": false
          },
          {
            "h": "7. Transactions: <code>https://xirr.ai/transactions</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Transaction.png",
              "cap": "Transactions, manual entry form"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lets the user add one buy or sell transaction by hand, entering the asset, trade details and charges."
          },
          {
            "p": "<b>Components</b> (<code>TransactionForm.tsx</code>):"
          },
          {
            "ul": [
              "Sidebar and \"Back to Upload\" link.",
              "Asset Details section: Investment Strategy dropdown (\"Choose strategy\") and ISIN / name search field.",
              "Transaction Details section: Transaction Type dropdown (Buy), Transaction Date picker, Quantity, Price Per Unit, Brokerage Fee.",
              "Taxes &amp; Other Charges section: GST Charges, STT Charges, Other Charges fields.",
              "Cancel button and Submit Transaction button (disabled until the required fields are filled)."
            ],
            "ordered": false
          },
          {
            "h": "8. News &amp; Events: <code>https://xirr.ai/news-events</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/News&Events-Dividend.png",
              "cap": "News &amp; Events, Dividend tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows recent alerts for the holdings, starting with dividends declared. The user can filter by strategy and search."
          },
          {
            "p": "<b>Components</b> (<code>Updates.tsx</code>):"
          },
          {
            "ul": [
              "Sidebar (News &amp; Events icon active) and header (profile, Swap profile, Currency, bell).",
              "\"Back to Dashboard\" link.",
              "Strategy filter (\"All Strategies\" dropdown).",
              "Category tabs (Dividend active, Transaction, Corp. Action, Announcement).",
              "Search box with refresh icon (\"Search alerts...\"): filters or reloads the list.",
              "Alert rows (company and event title, description, record date, amount, ticker): each row is one dividend alert (<code>AlertRow</code>)."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/News&Events-Transaction.png",
              "cap": "News &amp; Events, Transaction tab (empty)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows alerts about the user's transactions; there are none for the current filters."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Strategy filter, category tabs (Transaction active), search box with refresh.",
              "Empty-state message \"No alerts found for your filters\" (<code>EmptyState</code>).",
              "Footer: Terms, Privacy, Disclaimer, contact email, copyright."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/News&Events-Corp.png",
              "cap": "News &amp; Events, Corp. Action tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lists corporate actions (here stock splits) that affect the holdings."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Strategy filter, category tabs (Corp. Action active), search box with refresh.",
              "Corporate-action rows (company and action title, split description and ex-date).",
              "Footer."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/News&Events-Announcements.png",
              "cap": "News &amp; Events, Announcement tab"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lists company announcements and filings for the holdings; the user scans the headlines."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Strategy filter, category tabs (Announcement active), search box with refresh.",
              "Announcement rows (company name and short subject): in the code, clicking a row opens a detail popup (<code>AnnouncementModal</code> in <code>Updates2.tsx</code>, <code>PopupModal</code> in <code>Updates.tsx</code>); the popup is not shown in this screenshot."
            ],
            "ordered": false
          },
          {
            "h": "9. Reports: <code>https://xirr.ai/reports</code>"
          },
          {
            "img": {
              "src": "screenshots/screenshots/Reports.png",
              "cap": "Reports"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lets the user download portfolio reports in a chosen format for chosen members."
          },
          {
            "p": "<b>Components</b> (<code>ReportsPage.tsx</code>):"
          },
          {
            "ul": [
              "Sidebar (Reports icon active) and header.",
              "\"Back to Strategies\" link.",
              "Reports container with heading.",
              "Portfolio Report card: description, period dropdown (\"Current\"), format dropdown (Excel), Members dropdown (<code>ReportCard</code>).",
              "Corpus Report (Ledger) card: description, format dropdown (Excel), Members dropdown.",
              "Dividend Report card: description, format dropdown (Excel), Members dropdown.",
              "Gain/Loss Report card: description, year dropdown (\"Select a Year\"), format dropdown (Excel), Members dropdown.",
              "The download action is not visible in this view."
            ],
            "ordered": false
          },
          {
            "h": "10. Research: <code>https://xirr.ai/research</code>"
          },
          {
            "p": "Research pages (<code>ResearchPage.tsx</code>, wrapped by <code>InvestigoPage.tsx</code>) show the sidebar only, with no portal header. Every company screen shares the top bar (<code>HomeTopBar.tsx</code>: Investigo.ai title, company search box, Snapshot / Story / Feed switch) and a left panel with the company name (<code>HomeHeader.tsx</code>) and the Quick Take card (<code>QuickTake.tsx</code>: headline, sector line, summary, scrollable Bull Case and Bear Case boxes). The screens below use Larsen &amp; Toubro as the example company."
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-Snapshot.png",
              "cap": "Research, Larsen &amp; Toubro, Snapshot tab (top)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> One-screen factsheet for Larsen &amp; Toubro: price, market cap, 52-week range, price chart and performance. A back arrow next to the title returns the user to the previous screen."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Top bar with a back arrow button next to the Investigo.ai title, search box, Snapshot (active) / Story / Feed switch.",
              "Company name and Quick Take card with Bull Case and Bear Case.",
              "Company header (NSE symbol, ISIN, cap-size and sector chips): identifies the stock (<code>HomeHeader.tsx</code>).",
              "Price block (price, day change badge, date and currency note), Market Cap and 52- week low / high slider (<code>MetricsPanel.tsx</code>).",
              "Price &amp; Valuation chart with metric tabs (Price, PE, EV/EBITDA, Price to Sales, Price to Book): picks which series to chart.",
              "Price Performance list (1 Day to 1 Year, green or red values)."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-snapshot2.png",
              "cap": "Research, Larsen &amp; Toubro, Snapshot tab (scrolled)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows key financial ratios, valuation range and shareholding mix."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Same top bar and left panel.",
              "Comprehensive Financial Metrics tiles (P/E, ROE, ROCE, OPM, Dividend Yield, Debt to Equity).",
              "Valuation panel with tabs (P/E, EV/EBITDA, Price to Sales, Price to Book): current value, 5-year median, low and high, and a range slider.",
              "Shareholding Pattern donut (market cap in the centre, legend Promoters / Institutions / Retail / Others with percentages) and \"Know more\" button: ownership split (<code>MetricsPanel.tsx</code>)."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-story.png",
              "cap": "Research, Larsen &amp; Toubro, Story tab (intro)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Plain-language introduction to the company with headline financials."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Top bar (Story active) and Quick Take panel.",
              "Headline line and explanatory paragraph in a card.",
              "Four stat tiles (Revenue TTM, PAT TTM, EBITDA Margin, Market Price): <code>StatTiles.tsx</code>.",
              "\"SCROLL\" hint with down arrow: more content below."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-story2.png",
              "cap": "Research, Larsen &amp; Toubro, Story tab (act wheel)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Navigation wheel to the seven story chapters (acts) of the company report; clicking a node opens the chapter reader."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Centre node with the company name (hub) and seven numbered nodes I to VII (Who Are You?, Show Me the Money, What's Happening Now?, Who's Behind This?, What Could Go Wrong?, What's Next?, The Verdict): <code>OrbitNavigation.tsx</code>.",
              "Top bar and Quick Take panel."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-Feed-Announcements.png",
              "cap": "Research, Larsen &amp; Toubro, Feed tab, Announcements &amp; Filings"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Lists exchange filings for the company with bullet summaries; the user expands an item to read the points and open the source."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Feed sub-tabs (Announcements &amp; Filings active, News, X): <code>FeedPanel.tsx</code>.",
              "Filing list (exchange badge NSE or BSE, title, date, expand arrow); all rows collapsed. An expanded item shows a bullet summary and a \"SOURCE\" link.",
              "Scrollable list with its own scrollbar.",
              "Top bar and Quick Take panel."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-feed-news.png",
              "cap": "Research, Larsen &amp; Toubro, Feed tab, News"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows press headlines about the company with publisher and date (some in other languages)."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Feed sub-tabs (News active).",
              "News rows (PRESS badge, headline, publisher and date); scrollable."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-feed-x.png",
              "cap": "Research, Larsen &amp; Toubro, Feed tab, X"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Shows social and press-style posts about the company, summarised."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Feed sub-tabs (X active).",
              "Post rows with source badge (publisher names), headline and date; no item expanded; scrollable. An expanded item shows bullet points and a \"SOURCE\" link."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "screenshots/screenshots/Research-story-act.png",
              "cap": "Research, chapter reader (Larsen &amp; Toubro, Act I, Who Are You?)"
            }
          },
          {
            "p": "<b>Screen purpose:</b> Full-page chapter reader for Act I of the Larsen &amp; Toubro story: origin of the company, key facts and milestones. The user switches chapters on the left and acts on the bottom rail."
          },
          {
            "p": "<b>Components</b> (<code>ShellView.tsx</code>):"
          },
          {
            "ul": [
              "Top bar (<code>Topbar.tsx</code>): Investigo.ai title with the company story label, act number and title, close (x) button.",
              "\"ALL ACTS\" button: returns to the act wheel.",
              "Chapter tab rail (Origin &amp; DNA, Business Model, What They Own &amp; Control, Market Position &amp; Competition): <code>TabRail.tsx</code>.",
              "Reader body: chapter title, summary quote, fact cards (company name, founding year, sector, industry, HQ, tagline, order book value) and a Key Milestones table: <code>ReaderBody.tsx</code>.",
              "Act rail with roman numerals I to VII at the bottom left: jump between acts (<code>ActRail.tsx</code>).",
              "Sidebar (<code>SidebarNav.tsx</code>)."
            ],
            "ordered": false
          }
        ]
      },
      {
        "title": "Features and modules",
        "parts": [
          {
            "p": "Thirteen modules; paths are under <code>src/features/</code> unless noted."
          },
          {
            "table": {
              "head": [
                "Module",
                "Purpose and functionality",
                "Main files",
                "Main APIs"
              ],
              "rows": [
                [
                  "Authentication",
                  "Login, forgot / reset / change password, logout, token refresh",
                  "<code>shared/auth/*</code>, <code>contexts/UserContext</code>",
                  "<code>/api/v1/auth/login</code>, <code>/auth/refresh</code>, <code>/auth/forgot-password</code>, <code>/auth/reset-password</code>, <code>/api/v1/logout</code>, <code>/api/v1/clients/me</code>"
                ],
                [
                  "Portfolio Overview",
                  "Investor landing: total value, XIRR, allocation, XIRR chart, top strategies, family switcher, INR / USD",
                  "<code>investor/dashboard/OverviewPage</code>, <code>AssetStrategiesChart</code>, <code>WelcomePage</code>",
                  "<code>/api/v1/dashboard/{clientId}</code>, <code>/snapshot/{clientId}</code>, <code>/clients/{id}/xirr-chart-data</code>, <code>/top-strategies</code>"
                ],
                [
                  "Dashboard",
                  "Strategy and stock drill-down: performers, holdings, gain / loss, benchmark comparison, date range",
                  "<code>Dasboardv3</code>, <code>PortfolioDashboard</code>, <code>StockDashboard</code>, <code>GraphComponent</code>",
                  "<code>/api/v1/dashboard/{id}/strategy/...</code>, <code>/performers/...</code>, <code>/holdings/...</code>, <code>/gainloss/...</code>"
                ],
                [
                  "Strategies (Risk Compass)",
                  "Strategy tables, risk views, holdings per strategy",
                  "<code>investor/analytics/RiskCompassStrategy</code>",
                  "<code>/api/v1/strategies/*</code>, <code>/holdings/me/{strategyId}</code>"
                ],
                [
                  "Reports",
                  "Holding, gain / loss, dividend and corpus statements; month-end reports; PDF and Excel downloads (generated by the backend)",
                  "<code>investor/reports/ReportsPage</code>",
                  "<code>/api/v1/reports/*</code>, <code>/api/client/{id}/.../download/{format}</code>"
                ],
                [
                  "News &amp; Events",
                  "Announcements, dividends, corporate actions, recent transactions per strategy",
                  "<code>investor/dashboard/Updates</code>",
                  "<code>/api/v1/dashboard/{id}/announcements</code>, <code>/news-events/me/{strategyId}/{type}</code>"
                ],
                [
                  "Investigo Research",
                  "Researchable ISINs, chaptered story reader, quick take, stat tiles, notes, agent ask",
                  "<code>investor/research/*</code>",
                  "<code>GET /api/v1/research/me/available</code>, <code>/research/me/{isin}</code>"
                ],
                [
                  "Client Transactions",
                  "File upload, manual entry, template download",
                  "<code>components/ui/FileUploadComponent</code>, <code>TransactionForm</code>",
                  "<code>/api/v2/client/{id}/transactions/upload-file</code>, <code>/manual</code>, <code>/api/v2/templates/transaction-template</code>"
                ],
                [
                  "Order Intents",
                  "Lists agent order intents",
                  "<code>investor/intents/OrderIntentsPage</code>",
                  "<code>/api/v2/agent/{agentId}/order-intents</code>"
                ],
                [
                  "Tax Savings",
                  "Public survey and calculator",
                  "<code>investor/tax-savings/*</code>",
                  "None found (verify)"
                ],
                [
                  "Notifications &amp; Settings",
                  "Alerts (polled every 30 s), profile photo, settings, password",
                  "<code>shared/notifications</code>, <code>shared/profile/SettingsPage</code>",
                  "<code>/api/v1/clients/{id}/notifications</code>, <code>/photo</code>"
                ],
                [
                  "Admin: Dashboard &amp; Clients",
                  "Top families, family list and tree, add client / family / manager, photo upload",
                  "<code>management/dashboard</code>, <code>management/clients/*</code>",
                  "<code>/api/v2/rm/families</code>, <code>/rm/top-families</code>, <code>/rm/family/{id}/...</code>"
                ],
                [
                  "Admin: Transactions",
                  "Add, edit, list; contract notes; approve or reject pending transactions",
                  "<code>management/transactions/*</code>",
                  "<code>/api/v2/rm/clients/{id}/transactions</code>, <code>/contract-notes/*</code>, <code>/rm/pending-transactions/{id}/approve</code>"
                ],
                [
                  "Admin: Document Vault",
                  "KYC and document folders, upload, status, download",
                  "<code>management/vault/*</code>",
                  "<code>/api/v2/rm/clients/{id}/documents</code>, <code>/rm/files/{fileId}/download</code>"
                ]
              ]
            }
          },
          {
            "p": "<b>Investigo module internals.</b> The raw backend shape is typed in <code>research/api/researchApi.ts</code>; <code>research/data/mapResearchCompany.ts</code> is the only place that converts it to the UI shape (<code>ResearchCompany</code>). <code>mockCompany.ts</code> is fallback data. Home, Reader, Shell and Navigation components sit under <code>research/components/</code>, with state in <code>research/context/ResearchContext.tsx</code>."
          },
          {
            "p": "All write actions (upload, add transaction, settings) are disabled in admin read-only mode through <code>usePermissions()</code>."
          }
        ]
      },
      {
        "title": "API integration",
        "parts": [
          {
            "p": "All URL builders are in <code>src/api.ts</code> (161 exports); authenticated calls go through <code>utils/apiClient.ts</code>. Request and response bodies are defined by the backend, so use its Swagger / OpenAPI for field detail. The tables below come from the frontend code; methods marked \"verify\" were not confirmed."
          },
          {
            "p": "<b>Authentication</b>"
          },
          {
            "table": {
              "head": [
                "API",
                "Method",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>/api/v1/auth/login</code>",
                  "POST",
                  "Body <code>{username, password}</code>; returns <code>access_token</code>, <code>refresh_token</code>"
                ],
                [
                  "<code>/api/v1/auth/refresh</code>",
                  "POST",
                  "Body <code>{refresh_token}</code>; returns a new token pair"
                ],
                [
                  "<code>/api/v1/logout</code>",
                  "POST",
                  "End session"
                ],
                [
                  "<code>/api/v1/auth/forgot-password</code>, <code>/auth/reset-password</code>",
                  "POST",
                  "Password recovery"
                ],
                [
                  "<code>/api/v1/clients/me</code>",
                  "GET",
                  "Authoritative <code>client_id</code>, <code>display_name</code>, <code>welcome_name</code>"
                ]
              ]
            }
          },
          {
            "p": "<b>Investor APIs (v1)</b>"
          },
          {
            "table": {
              "head": [
                "Endpoint",
                "Method",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>/api/v1/dashboard/{clientId}?currency=</code>",
                  "GET",
                  "Portfolio overview"
                ],
                [
                  "<code>/api/v1/dashboard/{clientId}/top-strategies</code>, <code>recent-transactions</code>, <code>dividends</code>, <code>corporate-actions</code>, <code>announcements</code>",
                  "GET",
                  "Overview widgets and feeds"
                ],
                [
                  "<code>/api/v1/dashboard/{clientId}/strategy/{portfolioId}/{strategyId}</code>",
                  "GET",
                  "Strategy detail (benchmark, date-range params)"
                ],
                [
                  "<code>/api/v1/dashboard/{clientId}/stock/{stockName}/transactions</code>, <code>returns</code>, <code>dividends</code>, <code>announcements</code>",
                  "GET",
                  "Stock drill-down"
                ],
                [
                  "<code>/api/v1/dashboard/{clientId}/holding-statement</code>, <code>gain-loss-statement</code>",
                  "GET",
                  "Statement data"
                ],
                [
                  "<code>/api/v1/snapshot/{clientId}</code>",
                  "GET",
                  "Asset-strategy snapshot"
                ],
                [
                  "<code>/api/v1/clients/{clientId}/family-members</code>, <code>xirr-chart-data</code>, <code>notifications</code>, <code>photo</code>",
                  "GET",
                  "Family tree, chart, alerts, avatar"
                ],
                [
                  "<code>/api/v1/strategies/me</code>, <code>/strategies/client/{id}</code>, <code>/strategies/{id}/benchmarks</code>",
                  "GET",
                  "Strategy lists and benchmarks"
                ],
                [
                  "<code>/api/v1/holdings/me/{strategyId}</code> and <code>/live</code>, <code>/{isin}/transactions</code>, <code>returns</code>, <code>dividends</code>, <code>compare</code>, <code>announcements</code>",
                  "GET",
                  "Holdings; admin variant <code>/holdings/{portfolioId}/{strategyId}/...</code>"
                ],
                [
                  "<code>/api/v1/gainloss/me/{strategyId}</code> and <code>/{isin}/transactions</code>, <code>dividends</code>",
                  "GET",
                  "Gain / loss"
                ],
                [
                  "<code>/api/v1/performers/me/{clientStrategyId}</code>",
                  "GET",
                  "Best and worst performers"
                ],
                [
                  "<code>/api/v1/news-events/me/{strategyId}/{type}</code>",
                  "GET",
                  "News and events"
                ],
                [
                  "<code>/api/v1/portfolios/me/family/{clientId}</code>, <code>/family-groups/me/{groupId}/members</code>",
                  "GET",
                  "Family portfolio data"
                ],
                [
                  "<code>/api/v1/research/me/available</code>, <code>/research/me/{isin}</code>",
                  "GET",
                  "Investigo research"
                ],
                [
                  "<code>/api/v1/products/search?q=</code>",
                  "GET",
                  "Product search"
                ]
              ]
            }
          },
          {
            "p": "<b>Reports</b>"
          },
          {
            "table": {
              "head": [
                "Endpoint",
                "Method",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>/api/v1/reports/portfolio/{clientId}/generate</code>, <code>pdf</code>, <code>month-end</code>",
                  "Verify",
                  "Generate and download portfolio report"
                ],
                [
                  "<code>/api/v1/reports/portfolio/month-end/{reportId}/download</code> and <code>/pdf</code>",
                  "GET",
                  "Month-end report"
                ],
                [
                  "<code>/api/v1/reports/gainloss/{clientId}/{fyYear}</code> and <code>/pdf</code>; <code>/gainloss/family/{id}/download-all</code>",
                  "GET",
                  "Gain / loss report"
                ],
                [
                  "<code>/api/v1/reports/dividend/{clientId}?citizenship=</code> and <code>/pdf</code>",
                  "GET",
                  "Dividend report"
                ],
                [
                  "<code>/api/v1/reports/corpus/strategy/{portfolioId}</code> and <code>/pdf</code>",
                  "GET",
                  "Corpus report"
                ],
                [
                  "<code>/api/client/{id}/holding-statement</code>, <code>gain-loss-statement</code>, <code>dividend-report</code>, <code>corpus-statement</code> <code>/download/{format}</code>",
                  "GET",
                  "Statement downloads (xlsx, pdf)"
                ]
              ]
            }
          },
          {
            "p": "<b>Client transactions and RM / admin APIs (v2)</b>"
          },
          {
            "table": {
              "head": [
                "Endpoint",
                "Method",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>/api/v2/client/{id}/transactions/upload-file</code>, <code>/manual</code>",
                  "POST",
                  "Client uploads or adds transactions"
                ],
                [
                  "<code>/api/v2/templates/transaction-template?format=</code>",
                  "GET",
                  "Upload template"
                ],
                [
                  "<code>/api/v2/assets/search?q=</code>, <code>/rm/assets/by-type/{type}</code>",
                  "GET",
                  "Asset lookup"
                ],
                [
                  "<code>/api/v2/rm/families</code>, <code>/rm/top-families</code>, <code>/rm/family/{id}/complete-tree</code>",
                  "GET",
                  "Family lists and tree"
                ],
                [
                  "<code>/api/v2/rm/family/{id}/add-member</code>, <code>/member/{id}/upload-photo</code>",
                  "POST",
                  "Add member, photo"
                ],
                [
                  "<code>/api/v2/rm/clients/{id}/accounts</code>",
                  "Verify",
                  "Client accounts"
                ],
                [
                  "<code>/api/v2/rm/clients/{id}/accounts/{acc}/add-transaction</code>, <code>upload-contract-note</code>",
                  "POST",
                  "Add transaction, contract note"
                ],
                [
                  "<code>/api/v2/rm/clients/{id}/transactions</code>, <code>/accounts/{acc}/transactions/{txn}</code>",
                  "Verify",
                  "List, edit, delete"
                ],
                [
                  "<code>/api/v2/rm/clients/{id}/contract-notes</code> and <code>/{noteId}</code>, <code>/download</code>, <code>/approve-transactions</code>",
                  "Verify",
                  "Contract notes"
                ],
                [
                  "<code>/api/v2/rm/pending-transactions/{id}</code> and <code>/approve</code>, <code>/reject</code>",
                  "Verify",
                  "Approval workflow"
                ],
                [
                  "<code>/api/v2/rm/clients/{id}/documents</code>, <code>/{type}/status</code>; <code>/rm/files/{fileId}/download</code>",
                  "Verify",
                  "Vault documents"
                ],
                [
                  "<code>/api/v2/agent/{agentId}/order-intents</code>",
                  "GET",
                  "Order intents"
                ]
              ]
            }
          },
          {
            "p": "<b>Calling pattern</b>"
          },
          {
            "code": "// api.ts\nexport const familyTreeUrl = (clientId) => apiUrl(`/api/v1/clients/${clientId}/family-members`);\n\n// hooks/useApi.ts\nexport const useFamilyTree = (clientId, enabled) => useQuery({\n  queryKey: queryKeys.familyTree(clientId),\n  queryFn: async () => (await apiClient.get(familyTreeUrl(clientId))).data,\n  enabled,\n});"
          },
          {
            "p": "A 401 is handled centrally. Other errors are handled per component (sonner toast or inline message). Error shapes seen in the code: <code>data.detail[0].msg</code> (FastAPI validation) and <code>data.message</code>."
          }
        ]
      },
      {
        "title": "State management",
        "parts": [
          {
            "p": "Server data lives in React Query; session and UI selection live in three React contexts and the two browser storages."
          },
          {
            "table": {
              "head": [
                "Mechanism",
                "Where",
                "Holds"
              ],
              "rows": [
                [
                  "UserContext",
                  "<code>contexts/UserContext.tsx</code>",
                  "<code>currentUser</code> (clientId, role, username, displayName, welcomeName), selected user and strategy, family data, login / logout"
                ],
                [
                  "FamilyDataContext",
                  "<code>contexts/FamilyDataContext.tsx</code>",
                  "Family tree (via React Query), notifications and unread count (30 s poll), <code>loadData(clientId)</code>, <code>clearCache()</code>"
                ],
                [
                  "CurrencyContext",
                  "<code>contexts/CurrencyContext.tsx</code>",
                  "<code>INR</code> or <code>USD</code>, saved in localStorage <code>preferredCurrency</code>"
                ],
                [
                  "React Query",
                  "<code>App.tsx</code>, <code>hooks/useApi.ts</code>",
                  "All server data; keys in the <code>queryKeys</code> factory"
                ],
                [
                  "localStorage",
                  "<code>utils/auth.ts</code>",
                  "<code>access_token</code>, <code>refresh_token</code>, <code>preferredCurrency</code>"
                ],
                [
                  "sessionStorage",
                  "<code>UserContext</code>, <code>NavigationSync</code>",
                  "<code>clientId</code>, <code>userRole</code>, <code>username</code>, <code>displayName</code>, <code>welcomeName</code>, <code>selectedUserId</code>, <code>selectedUserName</code>, <code>familyGroupId</code>, <code>primaryUserId</code>, <code>lastSelectedMemberId</code>"
                ],
                [
                  "Component state",
                  "pages",
                  "Filters, modals, tabs, form inputs"
                ]
              ]
            }
          },
          {
            "p": "<b>Custom hooks</b>"
          },
          {
            "table": {
              "head": [
                "Hook",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>useUser</code>, <code>useCurrentUser</code>, <code>useSelectedUser</code>, <code>useFamilyData</code>",
                  "Read slices of UserContext"
                ],
                [
                  "<code>useCurrency</code>",
                  "Read currency; must be inside CurrencyProvider"
                ],
                [
                  "<code>useViewingContext</code>",
                  "<code>viewingClientId</code> = URL <code>:clientId</code> (admin view) or session client id; sets <code>viewMode</code> to <code>self</code> or <code>admin_readonly</code>"
                ],
                [
                  "<code>usePermissions</code>",
                  "Derives <code>canEdit</code>, <code>canAddTransaction</code>, <code>canUploadFiles</code>, <code>isReadOnly</code> from <code>viewMode</code> and role"
                ],
                [
                  "<code>useApi.ts</code> hooks",
                  "<code>useFamilyTree</code>, <code>useAvailableStrategies</code>, <code>useStrategyHoldings</code>, <code>useStrategyGainLoss</code>, <code>useStrategyDetails</code> (and date-range variant), <code>usePortfolioOverview</code>, <code>useAssetStrategies</code>, <code>usePerformers</code>, dividends / corporate actions / recent transactions / announcements"
                ],
                [
                  "<code>useNavigationWithLoader</code>",
                  "Navigate with a loader overlay"
                ]
              ]
            }
          },
          {
            "p": "When adding a data call: add the URL in <code>api.ts</code>, a key in <code>queryKeys</code>, a hook in <code>useApi.ts</code>, and put <code>currency</code> and <code>isMe</code> in the key whenever the response depends on them."
          }
        ]
      },
      {
        "title": "Deploying",
        "parts": [
          {
            "p": "Deployment is handled by another team, not by the frontend developers, so hosting, CI/CD and release steps are not documented here; ask that team for them. What the frontend hands over is the <code>dist/</code> build output."
          },
          {
            "p": "<b>Build</b>"
          },
          {
            "code": "npm install\nnpm run build      # static files into dist/"
          },
          {
            "ul": [
              "<code>vite.config.ts</code> sets <code>base: './'</code>, so assets use relative paths.",
              "Manual chunks: <code>vendor-react</code>, <code>vendor-router</code>, <code>vendor-react-query</code>, <code>vendor-recharts</code>, <code>vendor-framer-motion</code>; chunk warning limit 600 kB.",
              "terser strips <code>console.*</code> and <code>debugger</code> in production, so <code>console.error</code> in catch blocks will not show in prod. Source maps are off.",
              "Environment values are baked in at build time: set <code>VITE_API_BASE_URL</code> for the target environment before building."
            ],
            "ordered": false
          }
        ]
      },
      {
        "title": "Open items",
        "parts": [
          {
            "p": "Found by reading the code; none was reproduced in a running build."
          },
          {
            "table": {
              "head": [
                "#",
                "Area",
                "Issue",
                "State / next step"
              ],
              "rows": [
                [
                  "1",
                  "Routing / build",
                  "<code>AppRoutes.tsx</code> lazy-imports <code>.../dashboard/investigoPage</code>, but the file is <code>InvestigoPage.tsx</code>. Works on Windows, fails on a Linux build server or CI",
                  "Fix the import casing"
                ],
                [
                  "2",
                  "Build",
                  "<code>build</code> runs <code>vite build</code> only, so type errors do not fail the build",
                  "Use <code>tsc -b &amp;&amp; vite build</code> after fixing type errors"
                ],
                [
                  "3",
                  "Notifications polling",
                  "The 30 s <code>setInterval</code> in <code>FamilyDataContext</code> has an empty dependency array, so it captures <code>currentClientId</code> as null and likely never polls",
                  "Add <code>currentClientId</code> to the dependencies"
                ],
                [
                  "4",
                  "HTTP layer",
                  "<code>LoginCard</code>, <code>fetchNotifications</code> and the logout in <code>auth.ts</code> use raw <code>fetch</code>: no token injection or refresh. Notifications send no Authorization header (verify with backend)",
                  "Move to <code>apiClient</code>"
                ],
                [
                  "5",
                  "Code size",
                  "<code>RiskCompassStrategy</code> (~4.6k lines), <code>OverviewPage</code> (~1.8k), <code>Updates</code> (~1.6k), <code>ReportsPage</code> (~1.6k), <code>GraphComponent</code> (~1.4k)",
                  "Split into smaller components and hooks"
                ],
                [
                  "6",
                  "Dead / duplicate code",
                  "<code>Updates2</code>, <code>olderreports</code>, <code>Header</code> vs <code>Header1</code>, <code>Dasboardv3</code> (misspelt); <code>performersUrl</code>, <code>strategyPerformersUrl</code>, <code>getPerformersUrl</code> are identical",
                  "Confirm usage, remove, consolidate"
                ],
                [
                  "7",
                  "Security",
                  "Tokens are in localStorage (exposed to XSS); paste is blocked on the password field",
                  "Review with security; consider httpOnly cookies"
                ],
                [
                  "8",
                  "Login UX",
                  "Fixed 3-second delay on every login response",
                  "Product decision"
                ],
                [
                  "9",
                  "Legacy helpers",
                  "<code>clearAllUserData</code>, <code>performLogout</code>, <code>validateUserSessionLegacy</code> use localStorage keys no longer written",
                  "Remove once confirmed unused"
                ],
                [
                  "10",
                  "Pending work",
                  "<code>TransactionDocsPage.tsx</code> TODOs: \"Replace with actual API call\" (~line 144), \"Replace with actual download logic\" (~line 234); <code>olderreports.tsx</code> combined-endpoint TODO (~line 809)",
                  "Finish when backend is ready"
                ],
                [
                  "11",
                  "Typing",
                  "Widespread <code>any</code>; <code>familyData: any</code> in contexts",
                  "Add types in <code>src/types</code>"
                ],
                [
                  "12",
                  "Logging",
                  "About 80 <code>console.log</code> calls (stripped in prod); a <code>logger</code> util exists",
                  "Standardise on <code>logger</code>"
                ],
                [
                  "13",
                  "Repo hygiene",
                  "<code>src.zip</code>, <code>src (2).zip</code>, <code>XIRR-Portfolio.zip</code> and a prototype HTML sit in the project; the folder is not a git repository",
                  "Move to the real Git repo, remove archives"
                ],
                [
                  "14",
                  "Env config",
                  "<code>.env</code> holds many commented URLs for different environments",
                  "Use <code>.env.development</code> and <code>.env.production</code>"
                ],
                [
                  "15",
                  "Testing",
                  "No unit or e2e tests and no test script",
                  "Add Vitest and Playwright for the critical flows"
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "id": "xirr-mobile",
    "name": "Xirr Mobile App",
    "kind": "Mobile",
    "summary": "Frontend knowledge transfer for the XIRR mobile app: one Expo / React Native app over the XIRR REST API, serving clients and staff (RM / HOD / ADMIN / CSM), with native home-screen widgets. Confidential, for Xerago internal handover.",
    "owner": "Abinaya B.",
    "status": "active",
    "updated": "2026-11-10",
    "stack": [
      "Expo",
      "React Native",
      "TypeScript"
    ],
    "related": [
      "xirr-web"
    ],
    "links": [],
    "intro": [
      {
        "p": "<b>14 modules · about 40 screens · 4 contexts · 2 native widgets · 1 env var</b>"
      }
    ],
    "sections": [
      {
        "title": "1. Project Overview",
        "parts": [
          {
            "p": "XIRR Mobile is an Expo / React Native app (version 1.2.10) that shows investors their portfolio performance (XIRR returns) and gives relationship managers a way to manage client families, transactions and documents. It is the mobile counterpart of the XIRR web application and consumes the same REST API. This document covers the mobile frontend only; the API is built and owned by the backend team."
          },
          {
            "table": {
              "head": [
                "Item",
                "Detail"
              ],
              "rows": [
                [
                  "Purpose",
                  "Mobile access to portfolio, strategy and report data; staff tools for client management"
                ],
                [
                  "Users",
                  "Clients, and staff roles RM / HOD / ADMIN / CSM"
                ],
                [
                  "Platforms",
                  "Android and iOS (<code>com.xirr.mobileapp</code>), plus a web target for testing"
                ],
                [
                  "Key capabilities",
                  "INR / USD currency, family-tree view, market movers, news and announcements, report downloads, document vault, home-screen widgets"
                ],
                [
                  "API consumed (backend team)",
                  "<code>https://xirr.ai</code> (REST, bearer token)"
                ],
                [
                  "Distribution",
                  "EAS Build under Expo owner <code>abinayabs-organization</code>; no CI"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "2. Technology Stack",
        "parts": [
          {
            "table": {
              "head": [
                "Area",
                "Choice"
              ],
              "rows": [
                [
                  "Framework",
                  "Expo SDK ~54, React Native 0.81.5, React 19.1, New Architecture enabled (<code>newArchEnabled=true</code>), Hermes"
                ],
                [
                  "Language",
                  "TypeScript ~5.9"
                ],
                [
                  "Routing",
                  "expo-router ~6 (file-based), react-native-screens, gesture-handler"
                ],
                [
                  "Data",
                  "@tanstack/react-query ^5, AsyncStorage 2.2, expo-secure-store (installed, not used for tokens)"
                ],
                [
                  "UI",
                  "react-native-paper ^5, Montserrat fonts, react-native-svg 15.12 (charts), expo-linear-gradient, @expo/vector-icons, reanimated 4.1"
                ],
                [
                  "Files",
                  "expo-document-picker, expo-image-picker, expo-file-system, expo-sharing, expo-intent-launcher"
                ],
                [
                  "Build / tooling",
                  "EAS Build, Babel, Metro (custom config), patch-package (runs on <code>postinstall</code>)"
                ],
                [
                  "Native",
                  "Kotlin (Android widget), Swift / WidgetKit (iOS widget)"
                ]
              ]
            }
          },
          {
            "p": "Two project-specific notes:"
          },
          {
            "ul": [
              "<code>patches/react-native+0.81.5.patch</code> is applied on every <code>npm install</code>. Do not delete it or upgrade React Native without re-checking it.",
              "<code>metro.config.js</code> blocks any path containing <code>%</code>, turns off package <code>exports</code> resolution, and throws a clear error if a module resolves to null."
            ]
          }
        ]
      },
      {
        "title": "3. Project Architecture",
        "parts": [
          {
            "p": "The app is a thin client over a REST backend. Screens read state from contexts and hooks, which call <code>ApiService</code>; <code>ApiService</code> is the only code that talks to the backend and handles the bearer token and refresh. The session and currency are kept in AsyncStorage, and <code>UserContext</code> pushes cached portfolio data to the native widgets through <code>WidgetModule</code>."
          },
          {
            "img": {
              "src": "screenshots/from-pdf/mobile-architecture.png",
              "cap": "App architecture · 7 components"
            }
          },
          {
            "ul": [
              "<b>Frontend:</b> Expo Router screens in <code>app/</code>, shared UI in <code>components/</code>.",
              "<b>State:</b> four React contexts plus per-screen hooks (see section 9).",
              "<b>Service layer:</b> <code>config/api.ts</code> builds URLs and runs <code>fetchApi</code>; <code>services/api.ts</code> exposes one method per backend call.",
              "<b>API (external):</b> the existing XIRR REST API at <code>https://xirr.ai</code>; owned by the backend team, outside this document's scope. This repo contains no server code.",
              "<b>Native layer:</b> Android (Kotlin) and iOS (Swift / WidgetKit) widgets, fed by the app through <code>WidgetModule.ts</code>."
            ]
          }
        ]
      },
      {
        "title": "4. Project Structure",
        "parts": [
          {
            "p": "The workspace is <code>D:\\26-june-v2\\XIRR-APP-V2\\Native-Mobile (1)\\Native-Mobile</code>. Screens live in <code>app/</code> and use Expo Router's file-based routing."
          },
          {
            "code": "Native-Mobile/\n├── app/                 # screens (Expo Router)\n│   ├── (auth)/          # login, forgot-password\n│   ├── (tabs)/          # client tabs + staff (rm-*) tabs + hidden legacy tabs\n│   ├── analytics/       # announcements, corp-actions, dividends, transactions\n│   ├── _layout.tsx      # root: providers, fonts, splash\n│   └── index.tsx        # session check and redirect\n├── components/          # reusable UI (analytics, common, ui, features, features/rm-app)\n├── contexts/            # User, Currency, FamilyData, CompareChart\n├── hooks/               # React Query data hooks\n├── services/api.ts      # ApiService: all backend calls\n├── config/api.ts        # base URL and endpoint builders\n├── modules/, specs/     # JS bridge and codegen spec for the native widget\n├── types/, constants/, utils/\n├── android/, ios/       # native projects, including widget code\n├── credentials/         # signing material\n├── patches/, scripts/, web-reference/\n└── app.json, eas.json, package.json, metro.config.js, .env"
          },
          {
            "table": {
              "head": [
                "Folder / file",
                "What to know"
              ],
              "rows": [
                [
                  "<code>app/(tabs)/</code>",
                  "Client tabs: overview, dashboard, analytics, strategies, profile. Staff tabs: rm-dashboard, rm-clients, rm-files, rm-settings. Hidden (navigation only): portfolio, transactions, reports, admin-dashboard, clients, overview1, audit."
                ],
                [
                  "<code>app/*.tsx</code> (root)",
                  "Pushed screens: overview, strategies, strategy-details, add-transaction, upload, vault, vault-folder, vault-upload, notifications, news-events, change-password, chart-fullscreen, compare-chart-fullscreen, welcome, terms, privacy-policy, disclaimer, widget-preview"
                ],
                [
                  "<code>components/features/rm-app/</code>",
                  "Staff forms, document management and transaction history views"
                ],
                [
                  "<code>components/ui/</code>",
                  "Charts (<code>PerformanceChart</code>, <code>MultiStrategyXirrChart</code>) and <code>MetricCard</code>"
                ],
                [
                  "<code>services/api.ts</code>",
                  "About 1,450 lines; every backend call, session handling and caching"
                ],
                [
                  "<code>web-reference/</code>",
                  "<code>Sidebar.tsx</code> from the web app; reference only, excluded from EAS builds"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "5. Installation & Setup",
        "parts": [
          {
            "p": "<b>Prerequisites</b>"
          },
          {
            "ul": [
              "Node.js 18 or newer, and npm",
              "VS Code (or any editor)",
              "Android Studio for the Android emulator and native builds; Xcode on a Mac for iOS",
              "Expo Go on a phone for quick testing, or an EAS development build",
              "Access to the Expo organization <code>abinayabs-organization</code> for cloud builds"
            ]
          },
          {
            "p": "<b>Setup commands (run in the browser)</b>"
          },
          {
            "code": "cd \"Native-Mobile\"\nnpm install\nnpm run web     # opens the app in the browser on http://localhost:5173"
          },
          {
            "p": "These steps run the web target, which is for testing in a browser. <code>npm install</code> also applies the React Native patch (<code>postinstall</code>). To test on a phone instead, run <code>npm run dev</code>: it starts Expo in LAN mode on port 5173 with the cache cleared, and you scan the QR code with Expo Go."
          },
          {
            "p": "<b>Environment configuration</b>"
          },
          {
            "p": "Create or edit <code>.env</code> in the project root:"
          },
          {
            "code": "EXPO_PUBLIC_API_BASE_URL=https://xirr.ai"
          },
          {
            "p": "The current <code>.env</code> in the project sets it to this value. Set it before starting the app."
          },
          {
            "p": "<b>Run commands</b>"
          },
          {
            "table": {
              "head": [
                "Command",
                "Runs",
                "Use"
              ],
              "rows": [
                [
                  "<code>npm start expo start</code>",
                  "<code>--port 5173</code>",
                  "Starts the Expo dev server; press <code>a</code> (Android), <code>i</code> (iOS) or <code>w</code> (web) in the terminal, or scan the QR code with Expo Go"
                ],
                [
                  "<code>npm run dev</code>",
                  "<code>expo start --lan --clear --port 5173</code>",
                  "Same server in LAN mode with the cache cleared; the phone must be on the same Wi-Fi"
                ],
                [
                  "<code>npm run android</code>",
                  "<code>expo start --android --port 5173</code>",
                  "Starts the server and opens the app on the Android emulator or device"
                ],
                [
                  "<code>npm run ios</code>",
                  "<code>expo start --ios --port 5173</code>",
                  "Starts the server and opens the app on the iOS simulator (Mac only)"
                ],
                [
                  "<code>npm run web</code>",
                  "<code>expo start --web --port 5173</code>",
                  "Starts the server and opens the app in the browser"
                ]
              ]
            }
          },
          {
            "p": "<b>Troubleshooting</b>"
          },
          {
            "ul": [
              "The phone cannot connect to the dev server: check that the phone and computer are on the same Wi-Fi without a VPN, and that Windows Firewall allows Node.js (<code>NETWORK_SETUP.md</code>).",
              "Metro or module errors: <code>expo start -c</code>, then <code>npm install</code> again."
            ]
          }
        ]
      },
      {
        "title": "6. Application Workflow",
        "parts": [
          {
            "p": "<b>Startup</b>"
          },
          {
            "ol": [
              "<code>app/_layout.tsx</code> loads the Montserrat fonts, holds the splash screen, then wraps the app in providers: SafeArea, GestureHandler, React Query, Paper, <code>UserProvider</code>, <code>FamilyDataProvider</code>, <code>CurrencyProvider</code>, <code>CompareChartProvider</code>.",
              "<code>app/index.tsx</code> calls <code>ApiService.hasValidSession()</code>. A valid or silently refreshed session goes to <code>/(tabs)/dashboard</code>. Otherwise the stored session is cleared and the user goes to <code>/(auth)/login</code>."
            ]
          },
          {
            "p": "<b>Client journey</b>"
          },
          {
            "ol": [
              "Log in. The server returns a token, refresh token, client ID, role and username.",
              "Land on the client tabs: Overview, Dashboard, Analytics, Strategies, Profile. The shared <code>Header</code> shows the currency switch and notifications.",
              "Open a strategy for the performance table, NAV chart and holding / gain-loss statements; open Analytics for dividends, corporate actions, announcements and transactions.",
              "Download portfolio, dividend and gain-loss reports (PDF or Excel) from the reports views.",
              "Switch family member from the family tree; the screens reload for that member.",
              "Log out from Profile; the stored session and the widget data are cleared."
            ]
          },
          {
            "p": "<b>Staff (RM / HOD / ADMIN / CSM) journey</b>"
          },
          {
            "ol": [
              "Log in and land on the staff tabs: Dashboard, Client Mgmt, Doc Vault, Settings.",
              "Review metrics (AUM, client counts, new money), pending transactions (approve or reject) and top families.",
              "Open a client in Client Mgmt to view that client's data. The tab bar switches to the client tabs while a client is selected, and returns to the staff tabs on entering an RM route.",
              "Add transactions (manual form or CSV / Excel upload), manage family members, and upload or review client documents in the vault."
            ]
          },
          {
            "p": "<b>Authentication and session</b>"
          },
          {
            "ul": [
              "Login calls <code>/api/v1/auth/login</code>. Session values are stored in AsyncStorage under the keys in <code>STORAGE_KEYS</code> (<code>config/api.ts</code>).",
              "Requests send <code>Authorization: Bearer &lt;token&gt;</code>. On a 401 from a non-auth endpoint, <code>performTokenRefresh()</code> calls <code>/api/v1/auth/refresh</code> once and retries. Parallel 401s share one in-flight refresh."
            ]
          }
        ]
      },
      {
        "title": "Screens and URLs",
        "parts": [
          {
            "p": "The mobile app has no web address for each screen. Each screen has an in-app route that comes from its file under <code>app/</code> (Expo Router); the route groups <code>(auth)</code> and <code>(tabs)</code> are not part of the path. The API host <code>https://xirr.ai</code> is not a page URL. Screenshots were taken on a phone on 12 Nov 2026."
          },
          {
            "p": "<b>Shared parts (not repeated below)</b>"
          },
          {
            "ul": [
              "Header: XIRR logo, a profile switcher labelled \"Swap profile\", and a notification bell (<code>components/Header.tsx</code>). <code>components/common/SharedHeader.tsx</code> also draws a \"Swap profile\" switcher. Which of the two is on a given screen: not confirmed.",
              "Bottom tab bar: Overview, Dashboard, Analytics, Strategies, Profile, with the current tab highlighted (<code>app/(tabs)/_layout.tsx</code>). It is not visible on Login, Forgot password, the Dividends list and its popup, or the legal pages.",
              "Footer: not visible on any screen."
            ],
            "ordered": false
          },
          {
            "p": "<b>Personal data check.</b> The screenshots show a family name (\"Boyd\" in the header, in capitals on Overview) and a full person name on Profile, plus portfolio values and holdings. No password, email address, phone number, account number or PAN is visible, and the login fields are empty. The text below calls this \"the logged-in family profile\". Blur the names in <code>Overview.png</code>, <code>Profile.png</code> and the header of every other screenshot before sharing this doc outside Xerago."
          },
          {
            "h": "Login · <code>/login</code>"
          },
          {
            "p": "File: <code>app/(auth)/login.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Login.png",
              "cap": "Login screen",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user signs in with a username and password."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Logo: XIRR wordmark above the title.",
              "Title block: \"Login\" and \"Enter your credentials\".",
              "Username field: text input with a user icon.",
              "Password field: text input with a lock icon and a show / hide eye icon.",
              "Sign In button: gradient button for submitting the credentials.",
              "Forgot Password? link: text link below the button.",
              "Header and tab bar: not visible."
            ],
            "ordered": false
          },
          {
            "h": "Forgot password · <code>/forgot-password</code>"
          },
          {
            "p": "File: <code>app/(auth)/forgot-password.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Forget Password.png",
              "cap": "Forgot password screen",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user enters an email address to ask for a password reset link. In the code, the Send Reset Link action has a TODO and does not call the API (see section 8)."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Back arrow: top-left of the card.",
              "Logo: XIRR wordmark.",
              "Title block: \"Forgot Password?\" and one line of instructions.",
              "Email field: text input with an envelope icon.",
              "Send Reset Link button: gradient button.",
              "Back to Login link: text link below the button."
            ],
            "ordered": false
          },
          {
            "h": "Overview · <code>/overview</code>"
          },
          {
            "p": "File: <code>app/(tabs)/overview.tsx</code>. A second file, <code>app/overview.tsx</code>, maps to the same path; which one the app shows is not confirmed (see section 11). The \"VIEW FULL DASHBOARD\" button text is in the <code>(tabs)</code> file."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Overview.png",
              "cap": "Overview, family summary",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The first screen after login. It shows the logged-in family profile's total portfolio value, the change from last month, and one strategy summary."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: logo and notification bell only; no profile switcher is visible.",
              "Family name heading: the logged-in family profile's name in capitals.",
              "Total Portfolio Value card: value, and \"Change from Last Month\" with an arrow and percentage.",
              "Strategy summary box inside the card: strategy name, Current XIRR, Sharpe Ratio, and a banner comparing with NIFTY 50.",
              "Member avatar: circle with initials and a name label. <code>FamilyTree</code> is imported by this file; that this circle is that component is not confirmed.",
              "VIEW FULL DASHBOARD button: gradient button at the bottom.",
              "Bottom tab bar: Overview highlighted."
            ],
            "ordered": false
          },
          {
            "h": "Dashboard · <code>/dashboard</code>"
          },
          {
            "p": "File: <code>app/(tabs)/dashboard.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Dashboard1.png",
              "cap": "Dashboard, top of the page",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user sees the portfolio value and the month's gain, picks a strategy, and reads its allocation and key numbers."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: logo, profile switcher with \"Swap profile\", and bell.",
              "Total Portfolio card: total value, and Month's Gain as an amount with a percentage chip.",
              "Select a Strategy: label with a dropdown that shows the strategy name.",
              "Snapshot card: one bar showing 100.0%, with \"1 strategy\" and \"Equity\" labels below it.",
              "Metric cards: Invested, Current Value, XIRR, Sharpe Ratio (<code>MetricCard</code>).",
              "Gradient button: cut off at the bottom edge, behind the tab bar.",
              "Bottom tab bar: Dashboard highlighted."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Dashboard2.png",
              "cap": "Dashboard, scrolled down, Market Movers",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user opens the analytics screen or looks at the best and worst performing stocks."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: same as above.",
              "Metric cards: the same four cards, scrolled up.",
              "VIEW ANALYTICS button: gradient button with a chart icon.",
              "Market Movers: four chips, Best, Worst, Gainer, Loser, with Best selected (<code>MarketMovers</code>).",
              "Best Performer card: table with Stocks, Current Value and Returns; each row has a symbol, quantity, value and a return chip.",
              "Bottom tab bar: Dashboard highlighted."
            ],
            "ordered": false
          },
          {
            "h": "Strategies · <code>/strategies</code>"
          },
          {
            "p": "File: <code>app/(tabs)/strategies.tsx</code>; it imports <code>SharedHeader</code>, <code>PerformanceChart</code> and <code>Pagination</code>. A second file, <code>app/strategies.tsx</code>, maps to the same path; which one the app shows is not confirmed."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_overview.png",
              "cap": "Strategies, strategy versus benchmark",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user picks a strategy and a benchmark and reads the two side by side as a table and a NAV graph."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: logo, profile switcher with \"Swap profile\", and bell.",
              "Select a Strategy: label with a dropdown that shows the strategy name.",
              "Comparison table: rows XIRR, Sharpe Ratio, Max Drawdown and Current NAV, with columns Portfolio and NIFTY 50.",
              "Select Benchmark: label with a dropdown that shows NIFTY 50.",
              "NAV Graph card: title, an expand icon at the top right, a LATEST date label with the two NAV values, a legend, and two lines (one solid, one dashed) on a NAV (INR) axis.",
              "Bottom tab bar: Strategies highlighted."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings.png",
              "cap": "Strategies, holdings list",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the totals for the strategy and picks a holding to open. In the code, a tap on a holding opens <code>/audit/[id]</code>."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Search field: \"Search holdings...\" with a magnifier icon.",
              "Holding Statement button: gradient button, shown as the active choice.",
              "Reports button: outlined button with a download icon.",
              "Summary card: Total Investment, Current Value, Day P&amp;L, Unrealized P&amp;L (amount and percentage), No of Instruments, and Gainers / Losers shown as 3 / 1.",
              "Holding rows: symbol, quantity and average price, invested amount, LTP with a percentage, P/L, XIRR, and a chevron.",
              "Pagination: not visible.",
              "Bottom tab bar: Strategies highlighted."
            ],
            "ordered": false
          },
          {
            "h": "Holding detail · <code>/audit/[id]</code>"
          },
          {
            "p": "Files: <code>app/(tabs)/audit/[id].tsx</code> and <code>app/audit/[id].tsx</code>, both rendering <code>components/features/AuditDetail.tsx</code>. These screenshots match its five tab kinds (transactions, dividend history, announcements, returns, compare). Which of the two route files is used is not confirmed."
          },
          {
            "p": "The top of every holding screen is the same. It has a back arrow, a chip with the strategy name, the stock symbol, and a row of three figures: LTP, INVESTED and XIRR. Below that is a row of five tabs: Transactions, Dividend History, Announcements, Returns, Compare. The selected tab has a gradient fill. Long tab names are cut with \"...\". The header and the bottom tab bar are the shared parts above."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings_transactions.png",
              "cap": "Holding detail, Transactions tab",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user sees each buy of this holding with its date, quantity, cost and amount."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Transactions table: columns Date, Type, Qty / Cost per unit, Amount.",
              "Transaction row: date, a BUY chip, quantity with the unit cost, amount, and a gain figure in green with a percentage."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings_dividend.png",
              "cap": "Holding detail, Dividend History tab",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user sees the dividends received on this holding."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Dividend table: columns Record Date, Dividend Rate, Quantity, Amount Received.",
              "Dividend row: one row with a date, a rate, a quantity and an amount."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings_announcemnts.png",
              "cap": "Holding detail, Announcements tab",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads company announcements for this holding."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Announcement card: date at the top right, a bold title, then Company, Subject and Overview lines, with the overview cut off with \"...\".",
              "View Source Report link: green text with an external-link icon and a chevron at the bottom of each card.",
              "Second card: partly visible below the first."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings_return.png",
              "cap": "Holding detail, Returns tab",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the holding's return over five periods."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Return tiles: 1 DAY, 1 WEEK, 1 MONTH, 3 MONTH and 1 YEAR, each with a percentage chip. Negative values are red and positive values are green."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings_compare1.png",
              "cap": "Holding detail, Compare tab, top",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user compares the holding with two indices over time."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "COMPARISON ANALYSIS card: title with an expand icon at the top right.",
              "Legend: the stock symbol, NIFTY 50 and NIFTY 500, each with a coloured dot.",
              "Hint box: dashed box with \"Touch/Drag on graph to see details\".",
              "Line chart: three lines on a percentage axis with a date axis below.",
              "Comparison table: columns Name, XIRR, Sharpe Ratio, Drawdown; the first row is visible."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Strategy_holdings_compare2.png",
              "cap": "Holding detail, Compare tab, scrolled down",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The same screen, scrolled so the whole table is visible."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Line chart: same as above.",
              "Comparison table: three rows, the stock symbol, NIFTY 50 and NIFTY 500, with XIRR, Sharpe Ratio and Drawdown; names are coloured to match the chart legend."
            ],
            "ordered": false
          },
          {
            "h": "Analytics · <code>/analytics</code>"
          },
          {
            "p": "File: <code>app/(tabs)/analytics.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Analytics.png",
              "cap": "Analytics, XIRR graph and history list",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user sees how the XIRR of the top strategies moved over time and opens a history list."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: logo, profile switcher with \"Swap profile\", and bell.",
              "Top 3 Strategies heading.",
              "XIRR Graph card: title, an expand icon at the top right, a percentage axis, a date axis and a green line with a filled area (<code>MultiStrategyXirrChart</code> is imported by this file).",
              "Strategy chip: a coloured dot, the strategy name and its XIRR.",
              "VIEW STRATEGIES button: gradient button with a target icon.",
              "History: heading with an \"All Strategies\" dropdown.",
              "History list: rows Dividends, Transactions, Announcements and Corp. Actions, each with an icon and a chevron.",
              "Bottom tab bar: Analytics highlighted."
            ],
            "ordered": false
          },
          {
            "h": "Dividends · <code>/analytics/dividends</code>"
          },
          {
            "p": "File: <code>app/analytics/dividends.tsx</code>; it imports <code>AnalyticsHeader</code>, <code>AnalyticsInfoModal</code>, <code>Pagination</code> and <code>Header</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Analytics_Dividend.png",
              "cap": "Dividends list",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the dividends declared for held stocks and can filter by strategy or search by name."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: logo, profile switcher with \"Swap profile\", and bell.",
              "Back arrow and \"Dividends\" title, with an \"All Strategies\" dropdown on the right.",
              "Search field: \"Search dividends...\" with a magnifier icon.",
              "Dividends table: columns STOCK and RATE. Each row has a symbol, the company name and a record date, and the dividend type with its amount in blue.",
              "Pagination: not visible.",
              "Bottom tab bar: not visible."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Analytics_Dividend_Popup.png",
              "cap": "Dividends, detail popup",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the full details of one dividend."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Popup (<code>AnalyticsInfoModal</code>, with the section title \"Dividend Details:\" set in the file): a bottom sheet over a dimmed screen, with a handle bar at the top.",
              "Title block: the label DIVIDEND, the amount, the company name with \"Dividend Declared\", and a close button.",
              "Details list: Company, Dividend Type, Ex-Date, Record Date, Payment Date (shown as TBD) and Stock.",
              "Done button: gradient button at the bottom."
            ],
            "ordered": false
          },
          {
            "h": "Reports · <code>/reports</code>"
          },
          {
            "p": "File: <code>app/(tabs)/reports.tsx</code>, a hidden tab; it imports <code>SharedHeader</code>. A Reports button is visible on the Strategies holdings screen; that it opens this screen is not confirmed."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Reports.png",
              "cap": "Reports, list",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user chooses which report to set up and download."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Header: logo, profile switcher with \"Swap profile\", and bell.",
              "Back arrow: top right of the page body.",
              "Available Reports card: title and the line \"Select a report to configure and download\".",
              "Report rows: Portfolio Report, Dividend Report, Corpus Report (Ledger) and Gain/Loss Report. Each has a coloured icon, a one-line description and a chevron.",
              "Bottom tab bar: no tab highlighted."
            ],
            "ordered": false
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Reports_portfolio.png",
              "cap": "Reports, Portfolio Report options",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user sets the options for the Portfolio Report."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Back arrow and \"Reports\" heading.",
              "Portfolio Report panel: title and a description line.",
              "Dropdowns: \"Current\", \"EXCEL\" and \"Members\".",
              "Download button: not visible.",
              "Bottom tab bar: no tab highlighted."
            ],
            "ordered": false
          },
          {
            "h": "Profile · <code>/profile</code>"
          },
          {
            "p": "File: <code>app/(tabs)/profile.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Profile.png",
              "cap": "Profile",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user sees who is signed in, changes settings, opens the legal pages and logs out."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Banner: round avatar icon and the signed-in person's full name. The shared header is not shown here.",
              "Settings card: Currency (value INR), Change Password and Notifications, each with a chevron.",
              "About card: App Version (1.0.0), Privacy Policy, Terms &amp; Conditions and Disclaimer.",
              "Logout button: solid blue button.",
              "Bottom tab bar: Profile highlighted."
            ],
            "ordered": false
          },
          {
            "h": "Privacy policy · <code>/privacy-policy</code>"
          },
          {
            "p": "File: <code>app/privacy-policy.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Privacy_policy.png",
              "cap": "Privacy policy",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the privacy policy."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Title bar: back arrow and the title \"Privacy Policy\" on a grey-blue background.",
              "Policy text: justified paragraphs with numbered blue section headings and a blue link to the Terms of Use and Service."
            ],
            "ordered": false
          },
          {
            "h": "Terms · <code>/terms</code>"
          },
          {
            "p": "File: <code>app/terms.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Terms.png",
              "cap": "Terms of Service",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the terms of use. The Profile row calls it \"Terms &amp; Conditions\"; the screen title is \"Terms of Service\"."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Title bar: back arrow and the title \"Terms of Service\".",
              "Terms text: numbered blue section headings (\"1. Introduction\") and justified paragraphs."
            ],
            "ordered": false
          },
          {
            "h": "Disclaimer · <code>/disclaimer</code>"
          },
          {
            "p": "File: <code>app/disclaimer.tsx</code>."
          },
          {
            "img": {
              "src": "Screenshots-Mobile/Discalimer.png",
              "cap": "Disclaimer",
              "phone": true
            }
          },
          {
            "p": "<b>Screen purpose:</b> The user reads the disclaimer."
          },
          {
            "p": "<b>Components:</b>"
          },
          {
            "ul": [
              "Title bar: back arrow and the title \"Disclaimer\".",
              "Disclaimer card: a bordered, tinted card with a heading and two paragraphs."
            ],
            "ordered": false
          },
          {
            "h": "Pages with no screenshot"
          },
          {
            "p": "These routes exist in <code>app/</code> but have no screenshot in the folder: Welcome (<code>/welcome</code>), Notifications (<code>/notifications</code>), News &amp; Events (<code>/news-events</code>), Change Password (<code>/change-password</code>), the Announcements, Transactions and Corp. Actions lists (<code>/analytics/announcements</code>, <code>/analytics/transactions</code>, <code>/analytics/corp-actions</code>), the full-screen charts (<code>/chart-fullscreen</code>, <code>/compare-chart-fullscreen</code>), and the staff (RM) screens and vault and upload screens."
          },
          {
            "h": "Unsure"
          },
          {
            "ul": [
              "Two files map to <code>/overview</code>, <code>/strategies</code> and <code>/audit/[id]</code> (one in <code>app/</code>, one in <code>app/(tabs)/</code>). Which one is live is not confirmed.",
              "Which of <code>Header</code> and <code>SharedHeader</code> draws the header on each screen is not confirmed.",
              "The Profile screen shows App Version 1.0.0, but section 1 gives the app version as 1.2.10 from <code>app.json</code>.",
              "The LT holding shows XIRR 8.98% at the top, and 8.92% in the Compare table.",
              "How the user reaches the Reports screens is not confirmed.",
              "The Overview member circle is not confirmed to be the <code>FamilyTree</code> component."
            ],
            "ordered": false
          }
        ]
      },
      {
        "title": "7. Features & Modules",
        "parts": [
          {
            "table": {
              "head": [
                "Module",
                "Purpose",
                "Main files",
                "API / dependencies"
              ],
              "rows": [
                [
                  "Authentication",
                  "Login, logout, silent token refresh (forgot and change password are UI only; see section 12)",
                  "<code>app/(auth)/login.tsx</code>, <code>forgot-password.tsx</code>, <code>app/change-password.tsx</code>, <code>UserContext</code>, <code>ApiService.login / logout / hasValidSession</code>",
                  "<code>/api/v1/auth/*</code>"
                ],
                [
                  "Client dashboard and overview",
                  "Portfolio value, month gain, XIRR chart, top strategies, family-tree member switch",
                  "<code>app/(tabs)/dashboard.tsx</code>, <code>overview.tsx</code>, <code>components/PortfolioCardStack.tsx</code>, <code>features/FamilyTree.tsx</code>, <code>hooks/usePortfolioOverview.ts</code>, <code>useXirrChartData.ts</code>, <code>useFamilyTree.ts</code>",
                  "<code>/api/v1/dashboard/{id}/*</code>, <code>/api/v1/family-groups/me</code>"
                ],
                [
                  "Strategies",
                  "Strategy list, details, performance table, NAV chart, benchmark compare, holding and gain-loss statements",
                  "<code>app/(tabs)/strategies.tsx</code>, <code>app/strategy-details.tsx</code>, <code>components/ui/PerformanceChart.tsx</code>, <code>MultiStrategyXirrChart.tsx</code>, <code>CompareChartContext</code>",
                  "<code>/api/v1/dashboard/{id}/strategy/*</code>, <code>/api/v1/holdings/*</code>, <code>/api/v1/benchmarks/*</code>"
                ],
                [
                  "Analytics",
                  "Dividends, corporate actions, announcements, recent transactions",
                  "<code>app/(tabs)/analytics.tsx</code>, <code>app/analytics/*</code>, <code>components/analytics/*</code>",
                  "<code>/api/v1/news-events/*</code>"
                ],
                [
                  "Market movers",
                  "Best / worst performers, top gainers and losers",
                  "<code>components/features/MarketMovers.tsx</code>, <code>hooks/useMarketMovers.ts</code>",
                  "<code>/api/v1/performers/*</code>"
                ],
                [
                  "Reports",
                  "Portfolio, month-end, dividend, gain-loss and corpus reports as PDF or Excel",
                  "<code>app/(tabs)/reports.tsx</code> (hidden tab), <code>ApiService</code> report URL helpers",
                  "<code>/api/v1/reports/*</code>, <code>/api/v1/month-end/*</code>"
                ],
                [
                  "Notifications and news",
                  "In-app notifications and news feed (not push)",
                  "<code>app/notifications.tsx</code>, <code>app/news-events.tsx</code>",
                  "<code>/api/v1/dashboard/{id}/notifications</code>"
                ],
                [
                  "Profile and currency",
                  "Profile, INR / USD switch, logout",
                  "<code>app/(tabs)/profile.tsx</code>, <code>CurrencyContext</code>, <code>components/Header.tsx</code>",
                  "<code>/api/v1/clients/me</code>"
                ],
                [
                  "Staff dashboard",
                  "AUM, client counts, new money, top families, pending-transaction approval",
                  "<code>app/(tabs)/rm-dashboard.tsx</code>",
                  "<code>/api/rm/metrics/*</code>, <code>/api/rm/pending-transactions/*</code>"
                ],
                [
                  "Client management",
                  "Client and family list, create family, add members, photos, family tree, client data",
                  "<code>app/(tabs)/rm-clients.tsx</code>, <code>components/features/rm-app/FamilyProfileDetails.tsx</code>, <code>AuditDetail.tsx</code>",
                  "<code>/api/rm/families/*</code>, <code>/api/rm/clients/*</code>"
                ],
                [
                  "Transactions (staff)",
                  "Manual entry, CSV / Excel upload, contract notes, history",
                  "<code>app/add-transaction.tsx</code>, <code>app/upload.tsx</code>, <code>AddTransactionForm.tsx</code>, <code>TransactionHistoryView.tsx</code>",
                  "<code>/api/rm/clients/{id}/accounts/*</code>, <code>/api/v1/dashboard/{id}/transactions/*</code>"
                ],
                [
                  "Document vault",
                  "Upload, view, delete and update status of client documents",
                  "<code>app/(tabs)/rm-files.tsx</code>, <code>app/vault*.tsx</code>, <code>DocumentManagementView.tsx</code>",
                  "<code>/api/rm/clients/{id}/documents/*</code>"
                ],
                [
                  "Home-screen widgets",
                  "Portfolio value and top strategies on the Android and iOS home screens",
                  "<code>modules/WidgetModule.ts</code>, <code>UserContext</code>, <code>android/.../widget/*</code>, <code>ios/XIRRPortfolioWidget/*</code>",
                  "Cached overview and strategies pushed from the app"
                ],
                [
                  "Legal pages",
                  "Terms, privacy policy, disclaimer",
                  "<code>app/terms.tsx</code>, <code>privacy-policy.tsx</code>, <code>disclaimer.tsx</code>",
                  "Static"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "8. API Integration",
        "parts": [
          {
            "p": "This section lists the endpoints the app consumes. The API is built and owned by the backend team, so confirm behaviour and fields with them. Every call goes through <code>ApiService</code> (<code>services/api.ts</code>), which uses <code>fetchApi</code> from <code>config/api.ts</code>. URL builders live in <code>config/api.ts</code>; the base URL comes from <code>EXPO_PUBLIC_API_BASE_URL</code>. Calls send <code>Authorization: Bearer &lt;token&gt;</code>; a 401 triggers one shared token refresh and a retry. Most calls are GET; the writes are listed below."
          },
          {
            "p": "<b>Authentication</b>"
          },
          {
            "table": {
              "head": [
                "API",
                "Method",
                "Path",
                "Purpose"
              ],
              "rows": [
                [
                  "Login",
                  "POST",
                  "<code>/api/v1/auth/login</code>",
                  "Username and password; returns token, refresh token, client ID, role"
                ],
                [
                  "Forgot / reset password",
                  "POST",
                  "<code>/api/v1/auth/forgot-password</code>, <code>/reset-password</code>",
                  "Defined in config only; the forgot-password screen has a TODO and never calls it"
                ],
                [
                  "Current user",
                  "GET",
                  "<code>/api/v1/clients/me</code>",
                  "Profile"
                ]
              ]
            }
          },
          {
            "p": "<b>Client data (GET unless stated)</b>"
          },
          {
            "table": {
              "head": [
                "Area",
                "Path"
              ],
              "rows": [
                [
                  "Portfolio overview",
                  "<code>/api/v1/dashboard/{clientId}?currency=</code>"
                ],
                [
                  "XIRR chart data",
                  "<code>/api/v1/dashboard/{clientId}/xirr-chart-data</code>"
                ],
                [
                  "Top strategies",
                  "<code>/api/v1/dashboard/{clientId}/top-strategies</code>"
                ],
                [
                  "Available strategies",
                  "<code>/api/v1/dashboard/{clientId}/available-strategies</code>"
                ],
                [
                  "Strategy details",
                  "<code>/api/v1/dashboard/{clientId}/strategy/{portfolioId}/{clientStrategyId}</code>"
                ],
                [
                  "Benchmarks",
                  "<code>/api/v1/benchmarks/available</code>, <code>.../available-benchmarks</code>"
                ],
                [
                  "Snapshot (allocation)",
                  "<code>/api/v1/snapshot/{clientId}</code>"
                ],
                [
                  "Family",
                  "<code>/api/v1/family-groups/me</code>, <code>/api/v1/family-groups/me/{groupId}/members</code>, <code>/api/v1/dashboard/{clientId}/family-members</code>"
                ],
                [
                  "Holdings and per-stock detail",
                  "<code>/api/v1/holdings/{portfolioId}/{clientStrategyId}[/{isin}/transactions | dividends | announcements | returns | compare]</code>"
                ],
                [
                  "Statements",
                  "<code>/api/v1/dashboard/{clientId}/holding-statement</code>, <code>/gain-loss-statement</code>"
                ],
                [
                  "News and events",
                  "<code>/api/v1/news-events/{clientId}/{strategyId}/announcements | dividends | corporate-actions | recent-transactions</code>"
                ],
                [
                  "Market movers",
                  "<code>/api/v1/performers/{portfolioId}/{clientStrategyId}</code>"
                ],
                [
                  "Notifications",
                  "<code>/api/v1/dashboard/{clientId}/notifications</code>"
                ]
              ]
            }
          },
          {
            "p": "<b>Reports</b>"
          },
          {
            "table": {
              "head": [
                "Area",
                "Method",
                "Path"
              ],
              "rows": [
                [
                  "Portfolio report",
                  "GET",
                  "<code>/api/v1/reports/portfolio/{clientId}/download</code>, <code>/pdf</code>"
                ],
                [
                  "Month-end list / generate",
                  "GET / POST",
                  "<code>/api/v1/reports/portfolio/{clientId}/month-end</code>, <code>/generate</code>"
                ],
                [
                  "Month-end download",
                  "GET",
                  "<code>/api/v1/month-end/client/{clientId}/download-by-date</code>, <code>/api/v1/reports/portfolio/month-end/{reportId}/download</code>"
                ],
                [
                  "Family month-end",
                  "GET",
                  "<code>/api/v1/reports/portfolio/family/{clientId}/month-end/download-all</code>"
                ],
                [
                  "Dividend report",
                  "GET",
                  "<code>/api/v1/reports/dividend/{clientId}</code>, <code>/pdf</code>"
                ],
                [
                  "Gain-loss reports",
                  "GET",
                  "<code>/api/v1/reports/gainloss/{clientId}[/{year}]</code>, <code>/family/{clientId}/download-all</code>"
                ],
                [
                  "Corpus strategy report",
                  "GET",
                  "<code>/api/v1/reports/corpus/strategy/{portfolioId}</code>, <code>/pdf</code>"
                ]
              ]
            }
          },
          {
            "p": "<b>Staff (RM) endpoints</b>"
          },
          {
            "table": {
              "head": [
                "Area",
                "Method",
                "Path"
              ],
              "rows": [
                [
                  "Metrics",
                  "GET",
                  "<code>/api/rm/metrics/total-clients</code>, <code>total-aum</code>, <code>total-aum/monthly</code>, <code>new-clients-last-quarter</code>, <code>new-client-new-money</code>, <code>existing-client-new-money</code>, <code>existing-client-lost-money</code>, <code>invested-amount-by-asset-class</code>"
                ],
                [
                  "Families",
                  "GET / POST",
                  "<code>/api/rm/families</code>, <code>/api/rm/top-families</code>, <code>/api/rm/families/{id}/members</code>, <code>/api/rm/family/{id}/complete-tree</code>"
                ],
                [
                  "Pending transactions",
                  "GET / POST",
                  "<code>/api/rm/pending-transactions</code>, <code>/{id}</code>, <code>/{id}/approve</code>, <code>/{id}/reject</code>"
                ],
                [
                  "Client transactions",
                  "GET / POST",
                  "<code>/api/rm/clients/{id}/transactions</code>, <code>/accounts</code>, <code>/accounts/{accountId}/transactions</code>"
                ],
                [
                  "Transaction upload and template",
                  "POST / GET",
                  "<code>/api/v1/dashboard/{clientId}/transactions/upload-file</code>, <code>/manual</code>, <code>/api/v1/templates/transaction-template</code>"
                ],
                [
                  "Documents",
                  "GET / POST / PATCH / DELETE",
                  "<code>/api/rm/clients/{id}/documents[/{docType}]</code>"
                ],
                [
                  "Member photo",
                  "POST",
                  "<code>/api/rm/clients/{id}/members/{memberId}/photo</code>"
                ],
                [
                  "Lookups",
                  "GET",
                  "<code>/api/rm/relationship-managers</code>, <code>/api/enums</code>, <code>/api/rm/brokers</code>, <code>/api/rm/transaction-metadata</code>, <code>/api/assets/search</code>, <code>/api/v1/strategies/</code>"
                ]
              ]
            }
          },
          {
            "p": "Request and response shapes are typed in <code>types/index.ts</code>. Confirm field details with the backend team; this document does not list fields."
          }
        ]
      },
      {
        "title": "9. State Management",
        "parts": [
          {
            "p": "The app uses React Context for shared state and fetches server data in two ways. The client tabs and the shared hooks use plain <code>useState</code> + <code>useEffect</code>. React Query (<code>useQuery</code>, 30 calls in 14 files) is used in the pushed screens (overview, strategies, strategy-details, welcome, notifications, news-events, chart-fullscreen), the hidden tabs, and the staff screens (<code>rm-dashboard</code>, <code>rm-clients</code>, <code>FamilyProfileDetails</code>). <code>QueryClientProvider</code> is mounted in <code>app/_layout.tsx</code>."
          },
          {
            "table": {
              "head": [
                "Layer",
                "Where",
                "Holds"
              ],
              "rows": [
                [
                  "<code>UserContext</code>",
                  "<code>contexts/UserContext.tsx</code>",
                  "<code>currentUser</code> (clientId, role, username), <code>selectedUser</code> (family member or client being viewed), <code>selectedStrategy</code>, <code>familyData</code>, loading and error; <code>login</code> and <code>logout</code>; pushes widget data on start, login, foreground and logout"
                ],
                [
                  "<code>CurrencyContext</code>",
                  "<code>contexts/CurrencyContext.tsx</code>",
                  "INR / USD, saved in AsyncStorage (<code>@app_currency</code>), mirrored into URL params, pushed to the widget"
                ],
                [
                  "<code>FamilyDataContext</code>",
                  "<code>contexts/FamilyDataContext.tsx</code>",
                  "Family data shared across screens"
                ],
                [
                  "<code>CompareChartContext</code>",
                  "<code>contexts/CompareChartContext.tsx</code>",
                  "Selection for the compare-chart screen"
                ],
                [
                  "Data hooks",
                  "<code>hooks/*</code>",
                  "Each uses <code>useState</code> + <code>useEffect</code> to call <code>ApiService</code>, with <code>data</code>, <code>loading</code>, <code>error</code>; refetch when client ID or currency changes"
                ],
                [
                  "<code>ApiService</code> caches",
                  "<code>services/api.ts</code>",
                  "In-memory caches for group ID, default portfolio / strategy and first strategy per client; cleared by <code>clearClientCache</code> when the selected member changes"
                ],
                [
                  "Persisted storage",
                  "AsyncStorage",
                  "Session keys (<code>clientId</code>, <code>userRole</code>, <code>username</code>, <code>token</code>, <code>refreshToken</code>, <code>familyGroupId</code>) and the saved currency"
                ],
                [
                  "Local state",
                  "Each screen",
                  "Filters, tabs, form fields, pagination"
                ]
              ]
            }
          },
          {
            "p": "Provider order (outer to inner): SafeArea, GestureHandler, QueryClient, Paper, User, FamilyData, Currency, CompareChart. A context can only use contexts above it."
          }
        ]
      },
      {
        "title": "10. Deployment Process",
        "parts": [
          {
            "p": "There is no CI. Builds run on EAS from a developer's machine; store uploads are manual."
          },
          {
            "p": "<b>Build profiles (</b><code>eas.json</code><b>)</b>"
          },
          {
            "table": {
              "head": [
                "Profile",
                "Command",
                "Output"
              ],
              "rows": [
                [
                  "development",
                  "<code>eas build --profile development</code>",
                  "Dev client, internal distribution"
                ],
                [
                  "preview",
                  "<code>npm run build:android:apk</code>",
                  "Android APK, internal distribution"
                ],
                [
                  "production",
                  "<code>npm run build:android</code> / <code>build:ios</code> / <code>build:all</code>",
                  "Android app bundle; iOS Release (<code>m-medium</code>); auto-increment on"
                ]
              ]
            }
          },
          {
            "p": "<b>Release steps</b>"
          },
          {
            "ol": [
              "Bump <code>version</code>, <code>android.versionCode</code> and <code>ios.buildNumber</code> in <code>app.json</code>.",
              "Bump <code>versionCode</code> and <code>versionName</code> in <code>android/app/build.gradle</code> to match. <code>eas.json</code> uses <code>appVersionSource: local</code> and production <code>autoIncrement</code>, so check the numbers after each build.",
              "Test an internal build first: <code>npm run build:android:apk</code>.",
              "Run the production build for each platform.",
              "Upload the app bundle in the Play Console and the iOS build in App Store Connect.",
              "Install the store build and test one client login and one RM login, plus the widget on both platforms."
            ]
          },
          {
            "p": "<b>Signing</b>"
          },
          {
            "ul": [
              "Android keystore: <code>credentials/android/keystore.jks</code>. iOS: distribution certificates and provisioning profiles for the app (<code>XIRR</code>) and the widget extension (<code>XIRRPortfolioWidgetExtension</code>). Paths and passwords are referenced from <code>credentials.json</code>.",
              "Losing the Android keystore means no more updates to the same Play listing. Keep a copy in a secure vault."
            ]
          }
        ]
      },
      {
        "title": "11. Known Issues & Limitations",
        "parts": [
          {
            "p": "The items below were observed in the files; none has been changed."
          },
          {
            "table": {
              "head": [
                "Issue",
                "Where",
                "Why it matters"
              ],
              "rows": [
                [
                  "Signing secrets in the project",
                  "<code>credentials.json</code> holds plaintext keystore and certificate passwords; <code>credentials/</code> holds the <code>.jks</code>, <code>.p12</code> and <code>.mobileprovision</code> files",
                  "Anyone with the folder can sign builds as the company. Move to EAS-managed credentials or a vault, and rotate if shared."
                ],
                [
                  "Tokens in AsyncStorage",
                  "<code>STORAGE_KEYS</code> in <code>config/api.ts</code>",
                  "AsyncStorage is unencrypted. <code>expo-secure-store</code> is installed and is the safer place."
                ],
                [
                  "Two data-fetching styles",
                  "<code>useQuery</code> in 14 files; the client tabs and <code>hooks/*</code> use <code>useState</code> / <code>useEffect</code>",
                  "Caching and retry differ by screen. Pick one approach when you change a screen."
                ],
                [
                  "Cleartext traffic allowed on Android",
                  "<code>usesCleartextTraffic=\"true\"</code> in <code>AndroidManifest.xml</code>",
                  "Fine for local dev; review before a production release."
                ],
                [
                  "Duplicate and legacy screens",
                  "<code>app/overview.tsx</code> vs <code>(tabs)/overview.tsx</code>; <code>app/strategies.tsx</code> vs <code>(tabs)/strategies.tsx</code>; <code>overview1.tsx</code> (stub); hidden tabs",
                  "Confirm which copy is live before editing."
                ],
                [
                  "Push notifications missing",
                  "<code>expo-notifications</code> is not installed",
                  "The notifications screen reads from an API; there are no push alerts."
                ],
                [
                  "Stale docs",
                  "<code>README.md</code> (says <code>mobile-app/</code>, Expo Go, <code>expo build</code>), <code>FIXES.md</code> (SDK 51 to 54, RN 0.76), <code>PAGES_SUMMARY.md</code>, the widget developer guide, <code>CORS_AND_NETWORK.md</code> (mentions <code>api-xirr.ai.com</code>)",
                  "Treat as history. The code and this document take precedence."
                ],
                [
                  "Two version sources",
                  "<code>app.json</code> and <code>android/app/build.gradle</code>",
                  "Bump both at release."
                ],
                [
                  "No automated tests",
                  "No test folder or script in <code>package.json</code>",
                  "Regressions are caught manually."
                ],
                [
                  "Very large files",
                  "<code>services/api.ts</code> (~58 KB), <code>AuditDetail.tsx</code> (~73 KB), <code>terms.tsx</code> (~59 KB), <code>reports.tsx</code>, <code>rm-clients.tsx</code>, <code>strategies.tsx</code> (each 50 KB+)",
                  "Hard to review. Change in small steps."
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "id": "investigo",
    "name": "Investigo",
    "kind": "Platform",
    "summary": "INVESTIGO AI (folder investigo-ai-frontend) is a single-page React app that presents AI-generated equity research dossiers on listed Indian companies.",
    "owner": "Abinaya B.",
    "status": "active",
    "updated": "2026-11-11",
    "stack": [
      "React 19",
      "TypeScript",
      "Vite 8",
      "FastAPI backend"
    ],
    "related": [
      "xirr-web"
    ],
    "links": [],
    "intro": [],
    "sections": [
      {
        "title": "1. Overview",
        "parts": [
          {
            "p": "INVESTIGO AI (folder <code>investigo-ai-frontend</code>) is a single-page React app that presents AI-generated equity research dossiers on listed Indian companies. This document covers the frontend only (<code>D:\\INVESTIGO-22SEPT\\investigo\\pipeline\\investigo-ai-frontend</code>). The FastAPI backend and the Python pipeline are out of scope and are mentioned only where the UI calls them."
          },
          {
            "table": {
              "head": [
                "Item",
                "Detail"
              ],
              "rows": [
                [
                  "Framework",
                  "React 19 + TypeScript ~6.0, bundled by Vite 8"
                ],
                [
                  "Styling",
                  "One global stylesheet, <code>src/styles/globals.css</code> (2,182 lines), with Tailwind 4 loaded through <code>@import \"tailwindcss\"</code> and the <code>@tailwindcss/vite</code> plugin. Components use plain CSS class names, not Tailwind utilities."
                ],
                [
                  "Routing",
                  "react-router-dom 7 (<code>BrowserRouter</code>)"
                ],
                [
                  "Charts",
                  "Hand-built: inline SVG and CSS bars. No chart library."
                ],
                [
                  "Data fetching",
                  "Plain <code>fetch</code> calls inside components and data modules. No React Query/SWR, no shared API wrapper."
                ],
                [
                  "State",
                  "One React Context (<code>AppContext</code>) plus local <code>useState</code> per component"
                ],
                [
                  "Fonts",
                  "Fraunces (headings), IBM Plex Sans (body), IBM Plex Mono, loaded from Google Fonts in <code>index.html</code>"
                ],
                [
                  "Size",
                  "About 9.6k lines in <code>src/</code>; <code>globals.css</code> is roughly 2.2k of them"
                ],
                [
                  "Backend contract",
                  "FastAPI, port 5057"
                ]
              ]
            }
          },
          {
            "p": "What the app lets users do:"
          },
          {
            "ul": [
              "Sign in through a login screen (UI only, no real authentication yet).",
              "Pick any company that has a generated Story. The company list comes from the API.",
              "Read the company's \"Story\": 7 Acts made of chapters, 28 sections in total. Navigate with an orbit diagram, a command palette (Ctrl/Cmd+K) and the arrow keys.",
              "Open the \"Quick Take\" and the paginated \"Full Brief\" (downloadable as PDF through the browser print dialog).",
              "View a market Snapshot (price chart, valuation, ratios, shareholding donut), a one-page Infographic image, a live Feed (exchange announcements, news, X posts), Alt Signals (alternative-data series) and Skeleton Key (a two-metric trend view).",
              "Ask the AI Agent free-text questions about the company.",
              "Keep personal notes in a floating Notes drawer."
            ]
          }
        ]
      },
      {
        "title": "2. Setup and running",
        "parts": [
          {
            "p": "Requires Node 20+. Run <code>npm install</code>, then <code>npm run dev</code>. Vite serves on its default port (5173) and the UI calls the FastAPI backend at <code>http://localhost:5057</code> directly."
          },
          {
            "table": {
              "head": [
                "Script",
                "What it does"
              ],
              "rows": [
                [
                  "<code>npm run dev</code>",
                  "Vite dev server"
                ],
                [
                  "<code>npm run build</code>",
                  "<code>tsc -b</code> type-check, then <code>vite build</code> into <code>dist/</code>"
                ]
              ]
            }
          },
          {
            "p": "There are no <code>.env</code> files and no Vite proxy. The backend address is hard-coded, so the backend must allow cross-origin requests from the dev origin."
          },
          {
            "p": "How the API base URL is resolved (<code>src/api/client.ts</code>, evaluated once at load):"
          },
          {
            "table": {
              "head": [
                "Situation",
                "<code>API_BASE</code>"
              ],
              "rows": [
                [
                  "<code>npm run dev</code> (<code>import.meta.env.DEV</code>)",
                  "<code>http://localhost:5057</code>"
                ],
                [
                  "Production build, page opened from host <code>10.100.20.83</code>",
                  "<code>http://10.100.20.83:5057</code> (internal)"
                ],
                [
                  "Production build, any other host",
                  "<code>https://investigo-api.finvisdom.com</code> (public)"
                ]
              ]
            }
          },
          {
            "p": "A comment in the file says not to revert this to a single hard-coded IP, because the public site depends on the branch. To move the backend, change this one file; every fetch imports <code>API_BASE</code> from it. The one exception is <code>BriefOverlay</code>, which fetches its own CSS files (same origin, not the API)."
          },
          {
            "p": "Deployment hint: <code>public/serve.json</code> sets <code>no-cache</code> on <code>index.html</code> and one-year <code>immutable</code> caching on <code>*.js</code>/<code>*.css</code>, so a new build is picked up through hashed file names. <code>dist/</code> and <code>node_modules</code> are git-ignored."
          }
        ]
      },
      {
        "title": "3. Project structure",
        "parts": [
          {
            "p": "All code lives in <code>src</code>; shared pieces sit in <code>contexts/</code>, <code>data/</code>, <code>hooks/</code>, <code>utils/</code> and <code>types/</code>, and every screen is a component folder under <code>components/</code>."
          },
          {
            "code": "investigo-ai-frontend/\n├── index.html              # title, meta description, Google Fonts, mounts #root\n├── vite.config.ts          # react + tailwind plugins, \"@\" alias -> src\n├── package.json, tsconfig*.json, .oxlintrc.json\n├── public/                 # favicon, serve.json, snapshots/<slug>.png\n└── src/\n    ├── main.tsx            # StrictMode + App; calls initExpandModals()\n    ├── App.tsx             # BrowserRouter, AppProvider, route table\n    ├── api/client.ts       # API_BASE\n    ├── contexts/           # AppContext.tsx (provider), context.ts, useApp.ts\n    ├── data/companies/     # registry.ts (company list), loader.ts (one company)\n    ├── hooks/              # useKeyboardNav.ts, useAutoChartify.ts\n    ├── types/index.ts      # all shared types (296 lines)\n    ├── constants/index.ts  # chart palette, orbit geometry, chapter icons, SNAPSHOT_IMAGES\n    ├── utils/              # helpers.ts, story.ts, metricsFormat.ts, expandModal.ts\n    ├── styles/globals.css  # the app's real stylesheet\n    └── components/         # Home, Shell, Reader, Agent, Auth, Modal, Notes, Search, Navigation, Common"
          },
          {
            "table": {
              "head": [
                "Folder",
                "Files"
              ],
              "rows": [
                [
                  "<code>Home/</code>",
                  "HomeView (main screen), HomeHeader, HomeMenubar, HomeSearch, OrbitNavigation, QuickTake, MetricsPanel, TimeSeriesChart, FeedPanel, AltSignalsPanel, SkeletonKeyPanel, SnapshotPanel, PanelTabMenu"
                ],
                [
                  "<code>Shell/</code>",
                  "ShellView (chapter reader screen), Topbar, ActRail"
                ],
                [
                  "<code>Navigation/</code>",
                  "TabRail (chapter tabs within an Act)"
                ],
                [
                  "<code>Reader/</code>",
                  "ReaderBody, AnnouncementsLive"
                ],
                [
                  "<code>Agent/</code>",
                  "AgentPage, AgentPanel, AgentChart"
                ],
                [
                  "<code>Auth/</code>",
                  "LoginPage, LoginThread"
                ],
                [
                  "<code>Modal/</code>",
                  "BriefOverlay, ShareholdingDetailModal"
                ],
                [
                  "<code>Notes/</code>",
                  "NotesDrawer"
                ],
                [
                  "<code>Search/</code>",
                  "CommandPalette"
                ],
                [
                  "<code>Common/</code>",
                  "ChartTooltip"
                ]
              ]
            }
          },
          {
            "p": "Files that look live but are not used by the running app (confirm with the original author before deleting):"
          },
          {
            "table": {
              "head": [
                "File",
                "Status"
              ],
              "rows": [
                [
                  "<code>components/Reader/ReaderPanel.tsx</code>, <code>ReaderMasthead.tsx</code>",
                  "ReaderPanel is imported nowhere; ReaderMasthead is imported only by ReaderPanel"
                ],
                [
                  "<code>components/Sidebar/AsidePanel.tsx</code>, <code>SpinePanel.tsx</code>, <code>components/Navigation/FooterFilmstrip.tsx</code>",
                  "Not imported anywhere"
                ],
                [
                  "<code>components/Home/SnapshotInfographic.tsx</code>, <code>data/snapshotSchema.ts</code>",
                  "Only reference each other; never rendered. The live Infographic tab shows a static PNG instead."
                ],
                [
                  "<code>data/storyData.ts</code>, <code>data/briefData.ts</code>",
                  "Not imported. Leftover hard-coded Tata Power sample data from before the API."
                ],
                [
                  "<code>src/index.css</code>, <code>src/App.css</code>",
                  "Not imported (leftover Vite template CSS)"
                ],
                [
                  "<code>src/assets/*</code>, root <code>ChatGPT Image ... .png</code>",
                  "Template images and a design reference for the infographic"
                ],
                [
                  "<code>gsap</code>, <code>framer-motion</code>, <code>clsx</code>, <code>tailwind-merge</code>, <code>lucide-react</code>",
                  "Listed in <code>package.json</code> but never imported in <code>src/</code>"
                ]
              ]
            }
          }
        ]
      },
      {
        "title": "4. Routing and navigation",
        "parts": [
          {
            "p": "Routing is flat, with all components eagerly imported (no <code>React.lazy</code>). There is no 404 route and no route guard, so anyone can open <code>/home</code> directly without signing in."
          },
          {
            "table": {
              "head": [
                "Path",
                "Renders",
                "Notes"
              ],
              "rows": [
                [
                  "<code>/</code>",
                  "<code>LoginPage</code>",
                  "Landing page"
                ],
                [
                  "<code>/login</code>",
                  "<code>LoginPage</code>",
                  "Alias of <code>/</code>"
                ],
                [
                  "<code>/home/*</code>",
                  "<code>AppInner</code>",
                  "The actual app: <code>HomeView</code> + <code>ShellView</code> + <code>CommandPalette</code> + <code>BriefOverlay</code> + <code>ChartTooltip</code>, plus the Ctrl/Cmd+K and arrow-key handler"
                ],
                [
                  "<code>/agent</code>",
                  "<code>AgentPage</code>",
                  "Full-page Agent; \"Back to Story\" returns to <code>/home</code>"
                ]
              ]
            }
          },
          {
            "p": "Login (<code>LoginPage.tsx</code>): checks both fields are non-empty, waits 500 ms, then <code>navigate('/home')</code>. There is no API call and nothing is stored; a code comment marks where the real sign-in call goes. The animated \"thread\" (<code>LoginThread</code>) fills as the user types. \"Forgot password\" does nothing. The Logout button on the home screen navigates to <code>/login</code> and does not clear any state."
          },
          {
            "p": "Two views inside <code>/home</code>. <code>/home</code> is one URL holding two layered screens; the <code>viewMode</code> value in context (<code>'home'</code> or <code>'shell'</code>) decides which is active:"
          },
          {
            "table": {
              "head": [
                "View",
                "Element id",
                "What it shows"
              ],
              "rows": [
                [
                  "Home",
                  "<code>#home</code>",
                  "Company header, Quick Take, tab content"
                ],
                [
                  "Shell",
                  "<code>#shell</code>",
                  "Chapter reader: top bar, Act rail (roman-numeral dots), chapter tab rail, chapter body"
                ]
              ]
            }
          },
          {
            "p": "Clicking an Act or chapter in the orbit (or choosing one in the command palette) calls <code>zoomIntoChapter</code>, which animates the shell scaling up out of the orbit hub and then hides <code>#home</code>. \"← All Acts\" or Esc calls <code>zoomOutToHome</code>. The animation is imperative: it sets inline styles and adds or removes the CSS classes <code>ready</code> and <code>hide</code> on <code>#home</code>/<code>#shell</code>, and it finds the hub by the DOM id <code>orbitHub</code>. Renaming those ids or classes breaks the transition."
          },
          {
            "p": "Home tabs (the <code>homeTab</code> value in context, shown in <code>HomeMenubar</code>; the default is <code>metrics</code>):"
          },
          {
            "table": {
              "head": [
                "Tab id",
                "Menu label",
                "Content",
                "Enabled when"
              ],
              "rows": [
                [
                  "<code>story</code>",
                  "Story",
                  "Hero text, stat tiles, then the Orbit (revealed on scroll)",
                  "Always"
                ],
                [
                  "<code>metrics</code>",
                  "Snapshot",
                  "<code>MetricsPanel</code>",
                  "Always"
                ],
                [
                  "<code>infographic</code>",
                  "Infographic",
                  "<code>SnapshotPanel</code> (static PNG)",
                  "Company slug is in <code>SNAPSHOT_IMAGES</code> (only <code>360one</code> today)"
                ],
                [
                  "<code>feed</code>",
                  "Feed",
                  "<code>FeedPanel</code>",
                  "Always"
                ],
                [
                  "<code>alt-signals</code>",
                  "Alt Signals",
                  "<code>AltSignalsPanel</code>",
                  "Company has at least one alt signal"
                ],
                [
                  "<code>skeleton-key</code>",
                  "Skeleton Key",
                  "<code>SkeletonKeyPanel</code>",
                  "Always"
                ],
                [
                  "<code>agent</code>",
                  "Agent",
                  "Not a tab: navigates to <code>/agent</code>",
                  "Always"
                ]
              ]
            }
          },
          {
            "p": "If the user is on Infographic and switches to a company with no image, <code>HomeView</code> moves them to <code>metrics</code> automatically."
          },
          {
            "p": "Keyboard (<code>useKeyboardNav</code>, active only under <code>/home</code>): Ctrl/Cmd+K toggles the palette. Esc closes the palette, then the brief, then returns from the shell to home. Left/Right arrows move to the previous or next chapter across Act boundaries."
          },
          {
            "p": "There is no URL state for company or chapter; everything lives in <code>AppContext</code>, so refreshing returns to the default company and the Snapshot tab."
          }
        ]
      },
      {
        "title": "5. State and data layer",
        "parts": [
          {
            "p": "<code>AppContext</code> (<code>contexts/AppContext.tsx</code>, consumed through <code>useApp()</code>) is the only global state:"
          },
          {
            "table": {
              "head": [
                "Value",
                "Meaning"
              ],
              "rows": [
                [
                  "<code>company</code> / <code>companyLoading</code>",
                  "The loaded <code>CompanyData</code> (or null) and the loading flag"
                ],
                [
                  "<code>curAi</code>, <code>curCi</code>",
                  "Current Act index and chapter index"
                ],
                [
                  "<code>readSet</code>",
                  "Set of <code>\"ai:ci\"</code> strings for chapters already visited (reset when the company changes)"
                ],
                [
                  "<code>viewMode</code>, <code>homeTab</code>, <code>orbitActive</code>",
                  "Which screen, which tab, which Act is highlighted in the orbit"
                ],
                [
                  "<code>isPaletteOpen</code>, <code>isBriefOpen</code>",
                  "Overlay flags"
                ],
                [
                  "<code>selectCompany(slug)</code>",
                  "Loads a company and resets chapter position; resolves true on success"
                ]
              ]
            }
          },
          {
            "p": "Boot sequence: <code>initRegistry()</code> fetches <code>GET /companies</code>, then <code>selectCompany(getDefaultSlug())</code> loads the first company alphabetically, then the <code>ready</code> class is added to <code>#home</code>. Switching companies in <code>HomeSearch</code> calls <code>selectCompany</code> again. On a failed load the previous company stays on screen and the search box does not clear."
          },
          {
            "p": "Data modules: <code>data/companies/registry.ts</code> caches the company list in a module variable and offers <code>findCompany</code> (matches name, NSE symbol, ISIN or industry), <code>getDefaultSlug</code> and <code>getCompanyBySlug</code>. <code>loader.ts</code> fetches one company."
          },
          {
            "p": "Endpoints the frontend calls (all relative to <code>API_BASE</code>):"
          },
          {
            "table": {
              "head": [
                "Method and path",
                "Used by",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>GET /companies</code>",
                  "<code>registry.ts</code>",
                  "Company list (<code>CompanyMeta[]</code>); lists only companies that have a Story"
                ],
                [
                  "<code>GET /companies/{slug}</code>",
                  "<code>loader.ts</code>",
                  "Full <code>CompanyData</code> (hero, quick take, 7-Act story, brief, feed, news, alt signals)"
                ],
                [
                  "<code>GET /companies/{isin}/metrics?range=</code>",
                  "<code>MetricsPanel</code>",
                  "Price and valuation series, ratio grid, performance. Ranges: 1M, 6M, YTD, 1Y, 3Y, 5Y, 10Y, MAX. A second call with <code>range=5Y</code> feeds the 52-week band and valuation card."
                ],
                [
                  "<code>GET /companies/{isin}/skeleton-key</code>",
                  "<code>SkeletonKeyPanel</code>",
                  "Two-metric trend data and stat tiles"
                ],
                [
                  "<code>GET /companies/{isin}/shareholding-detail</code>",
                  "<code>ShareholdingDetailModal</code>",
                  "Named holders behind the shareholding donut"
                ],
                [
                  "<code>GET /announcements?isin=&amp;days=</code>",
                  "<code>FeedPanel</code> (3650 days), <code>AnnouncementsLive</code> (10 days)",
                  "Exchange filings and news"
                ],
                [
                  "<code>GET /x-posts?symbol=&amp;days=30</code>",
                  "<code>FeedPanel</code>",
                  "X (Twitter) posts keyed by NSE symbol"
                ],
                [
                  "<code>POST /ask</code>",
                  "<code>AgentPanel</code>",
                  "Body <code>{question, company_context}</code>; response <code>{ok, answer, source, row_count, charts}</code>"
                ]
              ]
            }
          },
          {
            "p": "Conventions in use:"
          },
          {
            "ul": [
              "Responses from metrics, skeleton-key, announcements and x-posts carry an <code>ok</code> flag; the UI treats <code>ok: false</code> as \"not available\".",
              "Timeouts via <code>AbortController</code>: 8 s for Metrics and Skeleton Key, 6 s for Feed, X posts and live announcements. The company registry, company loader, <code>/ask</code> and shareholding-detail calls have no timeout.",
              "Each effect sets a <code>cancelled</code> flag and aborts on cleanup, so a stale response from a previous company is ignored.",
              "Errors are caught in the component and shown inline. There is no global error boundary.",
              "Fallbacks: chapter 14 (\"Announcements Timeline\") fetches live data and falls back to the static HTML baked into the Story. The Feed tab does the same with the Story's own <code>feed</code> and <code>news</code>.",
              "Response types live in <code>types/index.ts</code> and are cast with <code>as</code>; nothing validates the shape at runtime.",
              "When adding an endpoint: use <code>API_BASE</code> from <code>api/client.ts</code>, add the response type to <code>types/index.ts</code>, and follow the abort-and-cancel pattern."
            ]
          },
          {
            "p": "Browser storage: only <code>NotesDrawer</code> uses <code>localStorage</code>, with <code>investigo-notes-v1</code> (the notes list) and <code>investigo-notes-tab-pos-v1</code> (where the user dragged the launcher icon). Notes are per browser and never synced. Access is wrapped in try/catch."
          }
        ]
      },
      {
        "title": "6. Screen-by-screen walkthrough",
        "parts": [
          {
            "p": "<b>Login (</b><code>/</code><b>)</b>"
          },
          {
            "ul": [
              "UI-only sign-in, described in section 4.",
              "Navigates to <code>/home</code>, which opens on the Snapshot (<code>metrics</code>) tab."
            ]
          },
          {
            "p": "<b>Home, Story tab</b>"
          },
          {
            "ul": [
              "<code>HomeView</code> renders the topbar (brand, <code>HomeSearch</code>, <code>HomeMenubar</code>, Logout), the left column (company name plus <code>QuickTake</code>) and the right pane.",
              "<code>QuickTake</code> injects <code>company.quickTakeHtml</code> and opens the Full Brief.",
              "The right pane shows <code>company.hero</code>: title, tagline and stat tiles.",
              "<code>OrbitNavigation</code> below it plots one node per Act on a circle. Geometry constants are in <code>constants/index.ts</code>; the company name in the hub comes from <code>hubLabel()</code>.",
              "The orbit zooms in once the pane is scrolled past about 40 px."
            ]
          },
          {
            "p": "<b>Chapter reader (shell view)</b>"
          },
          {
            "ul": [
              "<code>ShellView</code> shows the chapter thesis and <code>ReaderBody</code>.",
              "Chapter content is HTML from the API, injected with <code>dangerouslySetInnerHTML</code>.",
              "After render, <code>useAutoChartify</code> finds tables with two or more numeric columns and adds a Table/Chart toggle that draws a grouped-column SVG chart.",
              "<code>expandModal.ts</code> is one document-level click listener that powers \"More…\" popups through <code>data-modal-open</code>, <code>data-modal-close</code> and <code>data-modal-backdrop</code> attributes inside the injected HTML.",
              "The chapter icon is chosen by matching the title against regex rules in <code>CH_ICON_RULES</code>. A new chapter title with no match gets the generic document icon."
            ]
          },
          {
            "p": "<b>Snapshot (</b><code>metrics</code> <b>tab)</b>"
          },
          {
            "ul": [
              "<code>MetricsPanel</code> (555 lines) shows the price chart with range selector (<code>TimeSeriesChart</code>), valuation series and events, a ratio grid, a price-performance strip and the shareholding donut.",
              "Hovering a donut segment highlights its chip; \"Know more\" opens <code>ShareholdingDetailModal</code>.",
              "The 52-week low/high comes from the separate 5Y fetch, not from the selected range.",
              "Formatting helpers (<code>fmtCr</code>, <code>fmtNum</code>, cap-size class) are in <code>utils/metricsFormat.ts</code>."
            ]
          },
          {
            "p": "<b>Infographic</b>"
          },
          {
            "ul": [
              "<code>SnapshotPanel</code> shows <code>public/snapshots/&lt;slug&gt;.png</code>.",
              "To add a company: drop the image in <code>public/snapshots/</code> and add <code>slug: '/snapshots/&lt;slug&gt;.png'</code> to <code>SNAPSHOT_IMAGES</code> in <code>constants/index.ts</code>. That one change enables the tab."
            ]
          },
          {
            "p": "<b>Feed</b>"
          },
          {
            "ul": [
              "Three live sections: exchange announcements (BSE/NSE), news/press, and X posts.",
              "Key points are parsed in the browser from the AI summary text (<code>Key Points:</code> or <code>Key Financial Figures:</code> blocks).",
              "The specific headline comes from the summary's <code>Subject:</code> line.",
              "Items titled \"Newspaper Publication\" (a compliance copy of a newspaper ad) are dropped.",
              "Category styling is in the <code>CATEGORY_CLASS</code>, <code>NEWS_TYPE_CLASS</code> and <code>X_MEDIA_*</code> maps at the top of <code>FeedPanel.tsx</code>."
            ]
          },
          {
            "p": "<b>Alt Signals</b>"
          },
          {
            "ul": [
              "Renders <code>company.altSignals</code> (a series plus a bullish/bearish/neutral read, drawn as CSS-bar sparklines) and <code>company.altNotices</code>.",
              "Signals flagged <code>industryWide</code> are sector-wide aggregates. They must be labelled as such, never shown as company-specific.",
              "Companies with none see a \"coming soon\" placeholder, and the tab is disabled."
            ]
          },
          {
            "p": "<b>Skeleton Key</b>"
          },
          {
            "ul": [
              "Two metrics (for example revenue and operating margin) shown as bars across periods.",
              "Each metric is scaled against its own maximum because the units differ.",
              "Also shows an insight sentence and stat tiles."
            ]
          },
          {
            "p": "<b>Agent (</b><code>/agent</code><b>)</b>"
          },
          {
            "ul": [
              "<code>AgentPanel</code> takes a question, posts to <code>/ask</code>, plays a \"thinking\" stepper, then reveals the answer word by word.",
              "Answers are light markdown (<code>**bold**</code>, <code>***bold italic***</code>, <code>*</code> bullets), rendered by a small in-file parser, not a markdown library.",
              "<code>AgentChart</code> draws any <code>charts</code> the API returns.",
              "The page text states that the agent reports what sources indicate and gives no buy/sell advice."
            ]
          },
          {
            "p": "<b>Full Brief (</b><code>BriefOverlay</code><b>)</b>"
          },
          {
            "ul": [
              "Injects <code>company.briefHtml</code>, finds its <code>.sheet</code> elements and builds pagination (dots, prev/next, mouse-wheel page turn at scroll edges).",
              "\"Download PDF\" collects all page CSS (inline <code>&lt;style&gt;</code> plus fetched <code>&lt;link&gt;</code> stylesheets), builds a standalone HTML document, opens it in a new tab and triggers the browser print dialog."
            ]
          },
          {
            "p": "<b>Command palette</b>"
          },
          {
            "ul": [
              "Lists all chapters of the current company.",
              "Filtered by chapter title, Act title or thesis text."
            ]
          },
          {
            "p": "<b>Notes drawer</b>"
          },
          {
            "ul": [
              "A floating, draggable icon (hidden on <code>/</code> and <code>/login</code>) that opens a notes drawer.",
              "Notes are rich-text HTML kept in <code>localStorage</code>."
            ]
          }
        ]
      },
      {
        "title": "7. Types, constants and styling",
        "parts": [
          {
            "p": "Types (<code>types/index.ts</code>): the core model is <code>CompanyData</code> = <code>meta</code> (<code>CompanyMeta</code>), <code>hero</code>, <code>quickTakeHtml</code>, <code>glanceStats</code>, <code>story: Act[]</code>, <code>briefHtml</code>, <code>feed</code>, <code>news</code>, <code>altSignals</code>, <code>altNotices</code>, <code>lastUpdated</code>. A story is <code>Act[]</code>; each Act has <code>Chapter[]</code> (<code>no</code>, <code>title</code>, <code>thesis</code>, <code>stats</code>, <code>html</code>). <code>FlatChapter</code> and the helpers in <code>utils/story.ts</code> (<code>flattenStory</code>, <code>flatIndexOf</code>) give the single ordered chapter list used for prev/next. Other groups: <code>MetricsData</code> (price, valuation, ratios), <code>ShareholdingDetail</code>, <code>SkeletonKeyData</code>, <code>AltSignal</code>, <code>FeedItem</code>, <code>NewsItem</code>, <code>XPost</code>, and the context contract <code>AppContextValue</code>."
          },
          {
            "p": "Constants (<code>constants/index.ts</code>): <code>CHART_PALETTE</code> (7 colours), orbit geometry (<code>ORB_*</code>), chapter icon SVG paths and regex rules, and <code>SNAPSHOT_IMAGES</code>."
          },
          {
            "p": "Theme and styling:"
          },
          {
            "ul": [
              "Brand tokens are CSS variables on <code>:root</code> in <code>globals.css</code>: paper <code>#eaf4f7</code>, navy <code>#1762C7</code>, teal <code>#1fa8a6</code>, ink <code>#0d2033</code>, amber <code>#e3a13b</code>, green <code>#178f6c</code>, red <code>#c0392b</code>, plus layout sizes (<code>--spine-w</code>, <code>--aside-w</code>, <code>--head-h</code>, <code>--foot-h</code>).",
              "Styling is class-based in one file. A large share of the injected chapter and brief HTML relies on class names defined in <code>globals.css</code> (for example <code>mix-grid</code>, <code>mix-card</code>, <code>var-note</code>, <code>sheet</code>), so renaming a class can silently break AI-generated content.",
              "<code>App.tsx</code> injects a <code>&lt;style&gt;</code> that hides every scrollbar and sets <code>html, body { overflow: hidden }</code>. Panes scroll by wheel or trackpad only; screens are fixed-position and scroll themselves.",
              "Many components carry long comments recording decisions made \"per instruction\". Read them before changing layout, especially <code>HomeView.tsx</code> (scaling and the <code>SCROLLING_TABS</code> set) and <code>LoginPage.tsx</code> (the 48 px button indent depends on the thread width).",
              "A mobile breakpoint at 600 px stacks the two home columns and lets the page scroll naturally instead of using the scale-to-fit logic."
            ]
          },
          {
            "p": "Things to know before changing code:"
          },
          {
            "ol": [
              "Chapter and brief content is HTML from the backend. Changing class names, element ids (<code>home</code>, <code>shell</code>, <code>orbitHub</code>, <code>briefDots</code>, <code>briefPrev</code>, <code>briefNext</code>, <code>briefPageLabel</code>) or the modal data attributes can break it.",
              "<code>/home</code> state is not in the URL, so deep links to a company or chapter do not exist.",
              "Login is not real and there is no route protection.",
              "The backend URL logic in <code>api/client.ts</code> depends on the page hostname; keep both its public and internal branches.",
              "Several dependencies and files are unused (section 3). Confirm before removing."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "xray",
    "name": "XRAY",
    "kind": "Dashboard",
    "summary": "XRAY (internally \"SSE\", folder sse) is a single-page React app for analysing and tracking investment strategies, from development through to live performance.",
    "owner": "Abinaya B.",
    "status": "active",
    "updated": "2026-11-10",
    "stack": [
      "React 19",
      "TypeScript",
      "Vite 7",
      "Tailwind CSS 4",
      "Recharts"
    ],
    "related": [
      "investigo"
    ],
    "links": [],
    "intro": [],
    "sections": [
      {
        "title": "1. Overview",
        "parts": [
          {
            "p": "XRAY (internally \"SSE\", folder <code>sse</code>) is a single-page React app for analysing and tracking investment strategies, from development through to live performance. This document covers the <b>frontend only</b> (<code>D:\\XRAY-FINAL\\sse</code>); the Flask backend is out of scope and only referenced where the UI calls it."
          },
          {
            "table": {
              "head": [
                "Item",
                "Detail"
              ],
              "rows": [
                [
                  "Framework",
                  "React 19 + TypeScript 5.9, bundled by Vite 7"
                ],
                [
                  "Styling",
                  "Tailwind CSS 4 (<code>@tailwindcss/vite</code>) plus inline styles from <code>src/theme.ts</code>"
                ],
                [
                  "Routing",
                  "<code>react-router-dom</code> 7 (<code>BrowserRouter</code>)"
                ],
                [
                  "Charts / PDF / motion",
                  "Recharts 3, react-pdf 10, motion 12, lucide-react icons"
                ],
                [
                  "Data fetching",
                  "Plain <code>fetch</code> wrappers in <code>src/services</code> and <code>src/pages/api.ts</code> (no React Query/SWR)"
                ],
                [
                  "State",
                  "Local <code>useState</code>/<code>useEffect</code> per page; no global store"
                ],
                [
                  "Size",
                  "About 31.6k lines in <code>src/</code>; 13 page components hold roughly 27k of them"
                ],
                [
                  "Backend contract",
                  "Flask API, default port 5019"
                ]
              ]
            }
          },
          {
            "p": "What the app lets users do:"
          },
          {
            "ul": [
              "View portfolio and strategy dashboards (KPIs, top performers, conservative strategies).",
              "Follow a product's journey and development pipeline through stages.",
              "Select and filter strategies, then profile one in depth (risk, return, drawdown, DNA, trade distribution).",
              "Compare strategies and compare versions of a strategy.",
              "Monitor live strategies and drill into one.",
              "Upload files for analysis automation, with column mapping and format checks."
            ]
          }
        ]
      },
      {
        "title": "2. Setup and running",
        "parts": [
          {
            "p": "Run <code>npm install</code>, then <code>npm run dev</code>; the app serves on port 5173 and expects the Flask API on <code>127.0.0.1:5019</code>."
          },
          {
            "ol": [
              "<code>cd D:\\XRAY-FINAL\\sse</code>",
              "<code>npm install</code>",
              "Start the backend separately (not covered here).",
              "<code>npm run dev</code> opens Vite on <code>http://&lt;host&gt;:5173</code> (<code>host: true</code>, <code>strictPort: true</code>, so it fails if 5173 is taken)."
            ]
          },
          {
            "table": {
              "head": [
                "Script",
                "What it does"
              ],
              "rows": [
                [
                  "<code>npm run dev</code>",
                  "Vite dev server with file polling (avoids EMFILE on shared Linux hosts)"
                ],
                [
                  "<code>npm run build</code>",
                  "<code>tsc -b</code> type-check, then <code>vite build</code> into <code>dist/</code>"
                ]
              ]
            }
          },
          {
            "p": "<b>Environment variables</b>"
          },
          {
            "table": {
              "head": [
                "Variable",
                "Used by",
                "Purpose"
              ],
              "rows": [
                [
                  "<code>VITE_API_BASE_URL</code>",
                  "<code>src/config/apiBase.ts</code>",
                  "API origin baked into the build. Commented out in <code>.env</code>."
                ],
                [
                  "<code>VITE_DEV_BACKEND_URL</code>",
                  "<code>vite.config.ts</code>",
                  "Proxy target in dev. Default <code>http://127.0.0.1:5019</code>."
                ]
              ]
            }
          },
          {
            "p": "<b>How the API base URL is resolved</b>"
          },
          {
            "p": "<code>getApiBaseUrl()</code> follows these rules in order:"
          },
          {
            "ol": [
              "If <code>VITE_API_BASE_URL</code> is set and points to localhost, but the page is opened from a LAN IP in dev, it uses the page origin so the Vite proxy handles the call.",
              "Otherwise a set <code>VITE_API_BASE_URL</code> is used as given, minus any trailing slash.",
              "In dev with nothing set, it uses the page origin and relies on the proxy.",
              "In a production build with nothing set, it falls back to <code>http://localhost:5019</code>. <b>Set</b> <code>VITE_API_BASE_URL</code> <b>at build time for any deployment.</b>"
            ]
          },
          {
            "p": "The dev proxy forwards these path prefixes to Flask: <code>/api</code>, <code>/main_dashboard</code>, <code>/strategy-universe</code>, <code>/filter-options</code>, <code>/summary</code>, <code>/analyze</code>, <code>/check-format</code>. A new backend route outside these prefixes needs a new proxy entry in <code>vite.config.ts</code>."
          },
          {
            "p": "The committed <code>dist/</code> is a build output; <code>dist</code> and <code>node_modules</code> are in <code>.gitignore</code>."
          }
        ]
      },
      {
        "title": "3. Project structure",
        "parts": [
          {
            "p": "All code lives in <code>sse/src</code>; each route has one large page file, and shared pieces sit in <code>components/</code>, <code>services/</code> and <code>config/</code>."
          },
          {
            "code": "sse/\n├── index.html            # entry HTML, title \"X-RAY\", mounts #root\n├── vite.config.ts        # React + Tailwind plugins, dev proxy to Flask\n├── .env                  # optional VITE_API_BASE_URL (commented out)\n├── tailwind.config.js, tsconfig*.json, eslint.config.js\n├── dist/                 # build output (git-ignored)\n└── src/\n    ├── main.tsx          # StrictMode + BrowserRouter + App\n    ├── App.tsx           # Sidebar + route table + 404 page\n    ├── theme.ts          # COLORS palette (Constants.tsx re-exports it)\n    ├── types.ts          # shared API/response types (791 lines)\n    ├── config/apiBase.ts # getApiBaseUrl()\n    ├── services/         # api.ts, api_live_strategies.ts, api_trade_distribution.ts\n    ├── components/       # Sidebar, Header, modals, spinner, empty state\n    ├── pages/            # one folder per screen (see section 6) + api.ts\n    └── assets/           # logos and loading SVG"
          },
          {
            "p": "Page files and sizes:"
          },
          {
            "table": {
              "head": [
                "Folder / file",
                "Lines",
                "Route"
              ],
              "rows": [
                [
                  "<code>product_profile/CompareVersions.tsx</code>",
                  "6,176",
                  "<code>/profile/compare-redesign</code>"
                ],
                [
                  "<code>product_development/ProductDevelopmentAlts.tsx</code>",
                  "3,121",
                  "<code>/development</code>"
                ],
                [
                  "<code>compare_strategies/CompareProductsAlts.tsx</code>",
                  "2,519",
                  "<code>/compare</code>"
                ],
                [
                  "<code>analyze_strategy/AnalyzeStrategyAlts.tsx</code>",
                  "2,467",
                  "<code>/view-analysis</code>"
                ],
                [
                  "<code>strategy_selection/StrategySelectionAlts.tsx</code>",
                  "2,327",
                  "<code>/sse</code>"
                ],
                [
                  "<code>product_journey/ProductJourneyAlts.tsx</code>",
                  "2,038",
                  "<code>/journey</code>"
                ],
                [
                  "<code>live_strategies/LiveStrategy.tsx</code>",
                  "1,890",
                  "<code>/live</code>"
                ],
                [
                  "<code>analysisautomation/AnalysisAutomationAlts.tsx</code>",
                  "1,646",
                  "<code>/analysis</code>"
                ],
                [
                  "<code>product_profile/ProductProfileAlts.tsx</code>",
                  "1,483",
                  "<code>/profile</code>"
                ],
                [
                  "<code>main_dashboard/MainDashboardAlts.tsx</code>",
                  "1,512",
                  "<code>/</code>"
                ],
                [
                  "<code>live_strategies/LiveStrategyDetail.tsx</code>",
                  "1,370",
                  "<code>/live/detail</code>"
                ],
                [
                  "<code>product_note/ProductNoteAlts.tsx</code>",
                  "890",
                  "<code>/product-note</code>"
                ],
                [
                  "<code>product_info/ProductInfo.tsx</code>",
                  "842",
                  "<code>/info</code>"
                ]
              ]
            }
          },
          {
            "p": "Most page files share an <code>Alts</code> suffix, and several export a component simply named <code>App</code> (for example the dashboard, development and compare pages). Search by file name, not component name. The origin of the suffix is not documented in the code; confirm with the original author."
          }
        ]
      },
      {
        "title": "4. Routing and navigation",
        "parts": [
          {
            "p": "Routing is flat: <code>App.tsx</code> renders the <code>Sidebar</code> beside a <code>&lt;Routes&gt;</code> block, and every page is eagerly imported (no <code>React.lazy</code>). The sidebar is highlighted by deriving a page id from the URL path."
          },
          {
            "table": {
              "head": [
                "Path",
                "Page component",
                "Sidebar item"
              ],
              "rows": [
                [
                  "<code>/</code>",
                  "<code>MainDashboardAlts</code>",
                  "Dashboard"
                ],
                [
                  "<code>/dashboard</code>",
                  "redirect to <code>/</code>",
                  "n/a"
                ],
                [
                  "<code>/journey</code>",
                  "<code>ProductJourneyAlts</code>",
                  "Product Journey"
                ],
                [
                  "<code>/development</code>",
                  "<code>ProductDevelopmentAlts</code>",
                  "Development"
                ],
                [
                  "<code>/sse</code>",
                  "<code>StrategySelectionAlts</code> Strategy Selection",
                  ""
                ],
                [
                  "<code>/profile</code>",
                  "<code>ProductProfileAlts</code>",
                  "Product Profile"
                ],
                [
                  "<code>/profile/compare-redesign</code>",
                  "<code>CompareVersions</code>",
                  "none (opened from other pages)"
                ],
                [
                  "<code>/view-analysis</code>",
                  "<code>AnalyzeStrategyAlts</code>",
                  "hidden (item commented out)"
                ],
                [
                  "<code>/compare</code>",
                  "<code>CompareProductsAlts</code>",
                  "hidden (item commented out)"
                ],
                [
                  "<code>/live</code>",
                  "<code>LiveStrategy</code>",
                  "Live Strategies"
                ],
                [
                  "<code>/live/detail</code>",
                  "<code>LiveStrategyDetail</code>",
                  "none (opened from <code>/live</code>)"
                ],
                [
                  "<code>/analysis</code>",
                  "<code>AnalysisAutomationAlts</code>",
                  "Analysis Automation"
                ],
                [
                  "<code>/product-note</code>",
                  "<code>ProductNoteAlts</code>",
                  "hidden (item commented out)"
                ],
                [
                  "<code>/info</code>",
                  "<code>ProductInfo</code>",
                  "hidden (item commented out)"
                ],
                [
                  "<code>*</code>",
                  "inline \"Page Not Found\" card",
                  "n/a"
                ]
              ]
            }
          },
          {
            "p": "<b>Sidebar</b>"
          },
          {
            "p": "<code>components/Sidebar.tsx</code> is a 64px icon rail that expands to 256px on hover, closing after a 200ms delay to avoid flicker. Menu items come from a static <code>menuItems</code> array. To add a page: add the <code>&lt;Route&gt;</code> in <code>App.tsx</code>, add a <code>menuItems</code> entry whose <code>id</code> equals the path without the leading slash, and handle special prefixes in <code>getPageIdFromPath</code> (it already maps <code>journey*</code> and <code>product-note*</code>). Note that <code>/live/detail</code> does not match the <code>live</code> id, so the Live Strategies item is not highlighted on the detail page."
          },
          {
            "p": "<b>Passing context between pages</b>"
          },
          {
            "p": "Pages do not share a store. They hand data over in three ways, so check all three when tracing a flow:"
          },
          {
            "table": {
              "head": [
                "Mechanism",
                "Used for"
              ],
              "rows": [
                [
                  "<code>navigate(path, { state })</code> and <code>useLocation().state</code>",
                  "<code>/live</code> to <code>/live/detail</code>; journey, development and version-compare entry points"
                ],
                [
                  "Browser storage keys (read via <code>getItem</code>)",
                  "Strategy Selection to Analyze/Compare hand-off: <code>selectedStrategy</code>, <code>selectedStrategyId</code>, <code>selectedStrategyStageId</code>, <code>preSelectedStrategies</code>, <code>fromStrategySelectionAnalyze</code>, <code>fromStrategySelectionCompare</code>, <code>restoreAnalyzeSelection</code>, <code>restoreCompareSelections</code>, <code>comparatorSelections</code>, <code>comparatorCompareMode</code>"
                ],
                [
                  "Persisted UI state",
                  "<code>live_owner</code>, <code>live_search</code>, <code>live_stage</code>, <code>live_strategyType</code>, <code>live_summaryPage</code>, <code>productProfile_activeTab</code>, <code>productProfile_columnConfigs</code>, <code>productProfile_selectedVersions</code>"
                ]
              ]
            }
          },
          {
            "p": "These keys are bare strings spread across several files, so renaming one is a cross-file change; search for the literal string first. I did not verify per key whether it lives in <code>sessionStorage</code> or <code>localStorage</code>; check at the call site."
          }
        ]
      },
      {
        "title": "5. API layer",
        "parts": [
          {
            "p": "There is no single API client: three modules plus a few inline <code>fetch</code> calls talk to the same Flask backend, and the overlap is the main thing to understand before changing any call."
          },
          {
            "table": {
              "head": [
                "Module",
                "Role",
                "Used by"
              ],
              "rows": [
                [
                  "<code>services/api.ts</code> (812 lines)",
                  "Main client: URL builders (<code>dashboardUrls</code>, <code>strategySelectionUrls</code>, <code>compareStrategiesUrls</code>, <code>overviewUrls</code>, <code>riskEngineUrls</code>, <code>returnEngineUrls</code>, <code>drawdownEngineUrls</code>), <code>fetchWithTimeout</code>, analysis upload/export, dashboard, dev-pipeline and profile calls",
                  "Dashboard, Analysis, Analyze, Compare, Development, Journey, Profile, Strategy Selection"
                ],
                [
                  "<code>pages/api.ts</code> (511 lines)",
                  "Live-strategy and product-management calls: live KPIs, holdings/gain-loss, CSV downloads, journeys, version documents, strategy/stage/version CRUD",
                  "Live, Live Detail, Product Info, Product Note, Journey, <code>StrategyVersionModal</code>"
                ],
                [
                  "<code>services/api_live_strategies.ts</code> (245 lines)",
                  "Older copy of part of <code>pages/api.ts</code>",
                  "Compare, Strategy Selection (<code>getPipelineAnalytics</code>), <code>CompareVersions</code>"
                ],
                [
                  "<code>services/api_trade_distribution.ts</code> (52 lines)",
                  "<code>getTradeDistribution</code>",
                  "not imported by pages found in the grep; <code>services/api.ts</code> has its own version"
                ],
                [
                  "Inline <code>fetch</code> in pages",
                  "25 direct calls, e.g. <code>/api/product-note/generate</code>, <code>/api/strategy-versions/{id}/download</code>, <code>/api/strategies/analysis-reports/export</code>",
                  "Live, Product Info, Product Note"
                ]
              ]
            }
          },
          {
            "p": "Several function names exist in more than one module with different signatures (<code>getNavComparison</code>, <code>getXirrComparison</code>, <code>getBenchmarkMetrics</code>, <code>getHoldingStatement</code>, <code>getGainLossStatement</code>, <code>getAvailableBenchmarks</code>, <code>getStrategiesPortfolioSummary</code>). Always check which module a page imports before editing; fixing one copy does not fix the others."
          },
          {
            "p": "<b>Conventions in use</b>"
          },
          {
            "ul": [
              "<b>Base URL:</b> every module calls <code>getApiBaseUrl()</code> once at load. <code>services/api.ts</code> exposes <code>apiUrl(path)</code>; <code>sseApiUrl</code> and <code>analysisApiUrl</code> are aliases and <code>comparisonApiUrl</code> is a separate builder with the same base.",
              "<b>Identifiers:</b> most analytics calls take <code>strategyStageId</code> (the stage row id), not the strategy id. <code>withStageId()</code> appends <code>?strategy_stage_id=</code> when given. The compare endpoints accept stage ids only (stated in a comment in <code>services/api.ts</code>).",
              "<b>Errors:</b> helpers throw <code>Error</code> on a non-OK response. The analysis functions read <code>errorData.error</code> from the JSON body; most others throw a fixed message and discard the body. Pages catch and show their own message.",
              "<b>Timeouts:</b> only <code>fetchWithTimeout</code> (180s, <code>AbortController</code>) has one, and nothing outside <code>services/api.ts</code> uses it. Plain <code>fetch</code> calls can hang.",
              "<b>Uploads:</b> analysis calls send <code>FormData</code> with <code>files[]</code>, <code>benchmark_type</code>, <code>per_trade_capital</code> and optional mapping fields.",
              "<b>Downloads:</b> CSV and document downloads set <code>window.location.href</code> to the endpoint, so failures show a browser error page instead of an in-app message.",
              "<b>Payload typing:</b> response types live in <code>types.ts</code>, but write calls use <code>data: any</code> and several mappers use <code>any</code> (<code>mapToDashboardStrategy</code>, <code>getFilterOptions</code>)."
            ]
          },
          {
            "p": "When adding an endpoint: put the URL builder and typed wrapper in <code>services/api.ts</code>, add the response type to <code>types.ts</code>, and add the path prefix to the Vite proxy if it is new."
          }
        ]
      },
      {
        "title": "6. Page-by-page walkthrough",
        "parts": [
          {
            "p": "Every page is a self-contained file that fetches its own data in <code>useEffect</code>, holds all state locally, and defines its helper components (tooltips, dropdowns, cards) in the same file. Details below come from reading imports, headings, state and call sites; the business meaning of individual metrics should be confirmed with the product owner."
          },
          {
            "p": "<b>Main Dashboard (</b><code>/</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> portfolio-level KPIs, distributions, performance, rankings and a scatter view.",
              "<b>Data:</b> <code>dashboardUrls.summary</code>, <code>.distributions</code>, <code>.performance</code>, <code>.rankings</code>, <code>.health</code>, <code>.filterOptions</code> (all <code>/main_dashboard/*</code>).",
              "<b>UI:</b> Recharts <code>BarChart</code> and <code>ScatterChart</code>; local <code>MultiSelectSearch</code> and <code>SingleSelectDropdown</code> filters; animated <code>Counter</code>; custom tooltips."
            ]
          },
          {
            "p": "<b>Product Journey (</b><code>/journey</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> per-product timeline of stages and versions, with document preview.",
              "<b>Data:</b> <code>getAllProductJourneys</code>, <code>getProductJourneyDetails</code>, <code>getVersionContent</code> (from <code>pages/api</code>), <code>getPipelineAnalytics</code> (from <code>services</code>).",
              "<b>UI:</b> react-pdf <code>Document</code>/<code>Page</code> viewer with zoom, pagination and full-page mode; download of the original file.",
              "<b>State in:</b> reads <code>location.state</code> on entry."
            ]
          },
          {
            "p": "<b>Product Development (</b><code>/development</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> development pipeline health: stage counts, durations, convergence analysis and a comparator for picking versions to compare.",
              "<b>Data:</b> <code>getDevPipeline</code>, <code>getDevHealth</code>, <code>getDevStrategies</code>, <code>getDevStageDurations</code>, plus <code>getAllProductJourneys</code>, <code>getProductJourneyDetails</code>, <code>getVersionContent</code>. Filters are owner, days and strategy type.",
              "<b>UI:</b> largest stateful page (54 <code>useState</code> calls): sortable tables, fullscreen panels, react-pdf viewer.",
              "<b>Hand-off out:</b> navigates to <code>/profile/compare-redesign</code> with selected versions; saves <code>comparatorSelections</code> and <code>comparatorCompareMode</code>."
            ]
          },
          {
            "p": "<b>Strategy Selection (</b><code>/sse</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> \"Strategy Selection Engine\": filter the strategy universe with sliders and multi-selects, pick strategies, then send them onward.",
              "<b>Data:</b> <code>strategySelectionUrls.strategyUniverse</code> and <code>.filterOptions</code>, <code>getPipelineAnalytics</code>.",
              "<b>Hand-off out:</b> <code>navigate('/view-analysis')</code> for one strategy or <code>navigate('/compare')</code> for several, after writing the storage keys listed in section 4."
            ]
          },
          {
            "p": "<b>Product Profile (</b><code>/profile</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> one product's profile, including strategy DNA, documents and version selection.",
              "<b>Data:</b> <code>getProductProfileList</code>, <code>getProductProfileData(strategyId, stageId)</code>, <code>getStrategyDNA</code>, <code>getProductJourneyDetails</code>.",
              "<b>State:</b> persists <code>productProfile_activeTab</code>, <code>productProfile_selectedVersions</code> and <code>productProfile_columnConfigs</code>; the \"Compare Versions\" action jumps to the compare route."
            ]
          },
          {
            "p": "<b>Compare Versions (</b><code>/profile/compare-redesign</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> side-by-side comparison of strategy versions from their uploaded documents.",
              "<b>Data:</b> <code>getVersionContent</code> and <code>downloadVersionDocument</code> from <code>services/api_live_strategies</code>; the version list arrives through <code>location.state</code>.",
              "<b>Structure:</b> tabbed (<code>summary</code>, <code>heuristic</code>, <code>profit</code>, <code>exit</code>, <code>yearwise</code>, <code>holding</code>, among others), each tab a component rendered from <code>allTabData</code>. At 6,176 lines it holds many table and chart builders and parsing helpers for sheet content (<code>getRowLabel</code> alone is called about 40 times). Treat it as the highest-risk file to change."
            ]
          },
          {
            "p": "<b>Analyze Strategy (</b><code>/view-analysis</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> deep dive on one strategy and stage. Tabs include Overview, Transactions and Return Engine.",
              "<b>Data:</b> stage-keyed calls such as <code>getXirrComparison</code>, <code>getTradeDistribution</code>, <code>getProductProfileList</code>, <code>getVersionContent</code>; NAV and XIRR series reload when stage, benchmark, tab or chart type changes.",
              "<b>UI:</b> Recharts <code>AreaChart</code> and <code>BarChart</code>. Not in the sidebar; reached from Strategy Selection."
            ]
          },
          {
            "p": "<b>Compare Products (</b><code>/compare</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> compare several strategies on NAV and metrics.",
              "<b>Data:</b> <code>compareStrategiesUrls</code> (<code>availableStrategies</code>, <code>strategyDetails</code>, <code>indexedNavData</code>, <code>calculateMetrics</code>) and <code>getPipelineAnalytics</code>.",
              "<b>UI:</b> Recharts <code>LineChart</code>; uses <code>LoadingSpinner</code>. Not in the sidebar; reached from Strategy Selection."
            ]
          },
          {
            "p": "<b>Live Strategies (</b><code>/live</code><b>) and Detail (</b><code>/live/detail</code><b>)</b>"
          },
          {
            "ul": [
              "<b>List page:</b> stage and strategy-type summaries, owner/search filters, Gantt-style period presets, a <code>BarChart</code>, and report export (<code>/api/strategies/analysis-reports/export</code>). Filter choices persist under the <code>live_*</code> keys.",
              "<b>Detail page:</b> reads the selected strategy from <code>location.state</code>; tabs <code>holdings</code> (open positions) and <code>gainloss</code> (closed positions) fetch with a status filter; NAV comparison line chart; CSV downloads (<code>holdings</code>, <code>gainloss</code>, <code>unified</code>). Uses an internal <code>fetchSafe</code> wrapper and handles INR/USD formatting through <code>getSymbol</code> and <code>getLocale</code>.",
              "<b>Data:</b> <code>getStrategiesPortfolioSummary</code>, <code>getStrategiesAvailableStages</code>, <code>getStrategyUniqueValues</code>, <code>getNavComparison</code>, holdings and gain/loss helpers from <code>pages/api</code>."
            ]
          },
          {
            "p": "<b>Analysis Automation (</b><code>/analysis</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Purpose:</b> upload trade files (or pick a database strategy), map columns, run analysis against a benchmark, export results.",
              "<b>Flow:</b> <code>checkFileFormat</code>, then <code>ColumnMappingModal</code> when the format is not recognised, then <code>analyzeWithMapping</code> (file mode) or <code>analyzeFromDb</code> (db mode); results can be exported with <code>exportAnalysisResults</code>.",
              "<b>State:</b> <code>analysisMode</code> (<code>file</code> or <code>db</code>), <code>dataStructure</code> (<code>single_row</code> or <code>complete_trade</code>), <code>priceType</code> (<code>total</code> or <code>per_share</code>), benchmark tab (<code>trades</code> or <code>profit</code>). Multi-currency via <code>getCurrencySymbol</code>. Uses a Recharts <code>PieChart</code>."
            ]
          },
          {
            "p": "<b>Product Info (</b><code>/info</code><b>) and Product Note (</b><code>/product-note</code><b>)</b>"
          },
          {
            "ul": [
              "<b>Product Info:</b> admin-style CRUD with tabs <code>strategies</code>, <code>stages</code> and <code>versions</code>, using <code>StrategyVersionModal</code> for add/edit and a file upload.",
              "<b>Product Note:</b> a multi-sheet form (fixed tabs plus custom sheets) that posts to <code>/api/product-note/generate</code> and downloads a template from <code>/api/product-note/template</code>. Uses <code>motion</code> for tab transitions.",
              "Both are currently hidden from the sidebar."
            ]
          }
        ]
      },
      {
        "title": "7. Shared components, types and styling",
        "parts": [
          {
            "p": "Shared code is small: five components, one types file, one theme file. Most UI is still defined inside page files."
          },
          {
            "p": "<b>Components (</b><code>src/components</code><b>)</b>"
          },
          {
            "table": {
              "head": [
                "Component",
                "Props (summary)",
                "Notes"
              ],
              "rows": [
                [
                  "<code>Sidebar</code>",
                  "<code>currentPage</code>, <code>setCurrentPage</code>",
                  "Hover-expand rail; static <code>menuItems</code>; uses <code>fav.png</code>"
                ],
                [
                  "<code>Header</code>",
                  "<code>title</code>, <code>subtitle</code>, <code>timeRange</code>, <code>owner</code>, <code>onTimeClick</code>, <code>onOwnerClick</code>",
                  "Defaults to \"Last 12 Months\" and the placeholder owner \"John Advisor\" when props are missing"
                ],
                [
                  "<code>LoadingSpinner</code>",
                  "<code>fullScreen</code> (default true), <code>className</code>",
                  "Shows <code>XIRR-Bar-Loading-2.svg</code> on <code>#eaf4f7</code>"
                ],
                [
                  "<code>EmptyState</code>",
                  "<code>message</code>",
                  "Icon plus text, uses raw Tailwind greys"
                ],
                [
                  "<code>ColumnMappingModal</code>",
                  "<code>isOpen</code>, <code>onClose</code>, <code>onApply(mapping, dataStructure, priceType)</code>, <code>availableColumns</code>",
                  "Used by Analysis Automation; also exports the <code>ColumnMapping</code> type"
                ],
                [
                  "<code>StrategyVersionModal</code>",
                  "<code>isOpen</code>, <code>onClose</code>, <code>onSuccess</code>, <code>mode</code> (<code>add</code>/<code>edit</code>), <code>item</code>, <code>initialFile</code>, <code>initialData</code>, <code>hideUpload</code>",
                  "Calls <code>pages/api</code> for strategies, stage versions, add and update; used by Product Info and Product Note"
                ]
              ]
            }
          },
          {
            "p": "<b>Types (</b><code>src/types.ts</code><b>)</b>"
          },
          {
            "p": "This one 791-line file holds API response shapes: <code>APIResponse&lt;T&gt;</code>, <code>Strategy</code>, metrics and risk types, portfolio summary, breakup, NAV and XIRR comparison, holdings, gain/loss, dev-pipeline, profile, risk analysis and DNA types. <code>services/api.ts</code> re-exports them. <code>pages/api.ts</code> and <code>api_live_strategies.ts</code> declare their own overlapping interfaces (<code>StrategyRow</code>, <code>BreakupGroup</code>, <code>NavComparisonPoint</code>), so the same concept can have two incompatible types. Prefer the <code>types.ts</code> version for new code."
          },
          {
            "p": "<b>Theme and styling</b>"
          },
          {
            "ul": [
              "<b>Palette:</b> <code>src/theme.ts</code> exports <code>COLORS</code> (primary teal <code>#1fa8a6</code>, secondary blue <code>#1762C7</code>, background <code>#eaf4f7</code>, plus success/warning/danger and a teal-to-blue <code>gradient</code>). <code>Constants.tsx</code> only re-exports it.",
              "<b>Tailwind 4:</b> loaded through the Vite plugin; <code>index.css</code> imports Tailwind, sets a typography scale (title 24px, card 18px, body 14px, small 12px) and the Montserrat font from Google Fonts, and hides all scrollbars globally. <code>tailwind.config.js</code> also exists (class-based dark mode, CSS-variable colours) from the older config style.",
              "<b>Mixed styling:</b> pages combine Tailwind utility classes, inline <code>style={{ background: COLORS.x }}</code>, and many hard-coded hex values and arbitrary sizes such as <code>text-[10px]</code>. There is no component library or design-token layer, so visual changes are made file by file.",
              "<b>Charts:</b> Recharts everywhere, with per-page custom tooltips. <b>Animations:</b> <code>motion</code> in a few pages, plus CSS transitions."
            ]
          }
        ]
      }
    ]
  }
];
