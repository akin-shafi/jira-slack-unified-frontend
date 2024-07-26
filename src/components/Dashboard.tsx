import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../hooks";
import {
	fetchSlackMessages,
	fetchJiraIssues,
	fetchCombinedData,
} from "../store/dataSlice";
import { RootState } from "../store";

const Dashboard: React.FC = () => {
	const dispatch = useDispatch();
	const { combinedData, status, error } = useSelector(
		(state: RootState) => state.data
	);

	useEffect(() => {
		dispatch(fetchSlackMessages());
		dispatch(fetchJiraIssues());
		dispatch(fetchCombinedData());
	}, [dispatch]);

	if (status === "loading") {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl font-semibold">Loading...</div>
			</div>
		);
	}

	if (status === "failed") {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl font-semibold text-red-500">Error: {error}</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-black text-white py-4 px-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<h1 className="text-2xl font-bold">Unified Dashboard</h1>
					<nav className="hidden md:flex gap-4">
						<a
							className="hover:underline"
							href="/analytics">
							Analytics
						</a>
					</nav>
				</div>
				<div className="flex items-center gap-4 hidden">
					<button
						className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
						type="button"
						aria-haspopup="menu"
						aria-expanded="false"
						data-state="closed">
						<img
							src="/placeholder.svg"
							width="36"
							height="36"
							className="rounded-full"
							alt="Avatar"
							style={{ aspectRatio: "36 / 36", objectFit: "cover" }}
						/>
					</button>
				</div>
			</header>

			<div className="flex-1 flex">
				<aside className="bg-background border-r w-64 p-6 hidden md:block">
					<nav className="space-y-4">
						<a
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
							href="/Overview">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-5 h-5">
								<rect
									width="7"
									height="7"
									x="3"
									y="3"
									rx="1"></rect>
								<rect
									width="7"
									height="7"
									x="14"
									y="3"
									rx="1"></rect>
								<rect
									width="7"
									height="7"
									x="14"
									y="14"
									rx="1"></rect>
								<rect
									width="7"
									height="7"
									x="3"
									y="14"
									rx="1"></rect>
							</svg>
							Overview
						</a>
						<a
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
							href="/Overview">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-5 h-5">
								<line
									x1="12"
									x2="12"
									y1="20"
									y2="10"></line>
								<line
									x1="18"
									x2="18"
									y1="20"
									y2="4"></line>
								<line
									x1="6"
									x2="6"
									y1="20"
									y2="16"></line>
							</svg>
							Analytics
						</a>
						<a
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
							href="/Overview">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-5 h-5">
								<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
								<circle
									cx="12"
									cy="12"
									r="3"></circle>
							</svg>
							Settings
						</a>
					</nav>
				</aside>

				<div className="container mx-auto p-4">
					<main className="flex-1 p-6">
						<div
							dir="ltr"
							data-orientation="horizontal">
							<div className="mt-2 space-y-2">
								<div>
									<h2 className="text-lg font-medium">Metrics</h2>
									<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-2">
										<div className="rounded-lg border bg-muted text-muted-foreground p-4">
											<h3 className="text-sm font-medium">Issues </h3>
											<p className="text-2xl font-bold">
												{combinedData.jiraIssues.length}
											</p>
										</div>
										<div className="rounded-lg border bg-muted text-muted-foreground p-4">
											<h3 className="text-sm font-medium">Total Messages</h3>
											<p className="text-2xl font-bold">
												{combinedData.slackMessages.length}
											</p>
										</div>
									</div>
								</div>

								<div className="hidden">
									<h2 className="text-lg font-medium">Top Projects</h2>
									<ul className="space-y-2 mt-2">
										<li className="rounded-lg border bg-muted p-4">
											<p className="text-sm font-medium">Project A</p>
										</li>
										<li className="rounded-lg border bg-muted p-4">
											<p className="text-sm font-medium">Project B</p>
										</li>
										<li className="rounded-lg border bg-muted p-4">
											<p className="text-sm font-medium">Project C</p>
										</li>
										<li className="rounded-lg border bg-muted p-4">
											<p className="text-sm font-medium">Project D</p>
										</li>
									</ul>
								</div>
								<div className="hidden">
									<h2 className="text-lg font-medium">Settings</h2>
									<div className="space-y-2 mt-2">
										<div className="rounded-lg border bg-muted p-4">
											<h3 className="text-sm font-medium">Profile Settings</h3>
											<p className="text-sm">
												Update your profile information, change your password,
												and manage your account settings.
											</p>
										</div>
										<div className="rounded-lg border bg-muted p-4">
											<h3 className="text-sm font-medium">
												Notification Settings
											</h3>
											<p className="text-sm">
												Customize your notification preferences, such as email
												notifications and in-app alerts.
											</p>
										</div>
										<div className="rounded-lg border bg-muted p-4">
											<h3 className="text-sm font-medium">Privacy Settings</h3>
											<p className="text-sm">
												Manage your privacy settings, including data sharing and
												visibility options.
											</p>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
									<div className="mb-8 lg:mb-0">
										<h2 className="text-2xl font-semibold mb-4">
											Slack Messages
										</h2>
										<ul className="bg-white shadow-md rounded-lg p-4">
											{combinedData.slackMessages.map((message: any) => (
												<li
													key={message.id}
													className="border-b last:border-none py-2">
													{message.text}
												</li>
											))}
										</ul>
									</div>

									<div className="mb-8 lg:mb-0">
										<h2 className="text-2xl font-semibold mb-4">Jira Issues</h2>
										<ul className="bg-white shadow-md rounded-lg p-4">
											{combinedData.jiraIssues.map((issue: any) => (
												<li
													key={issue.id}
													className="border-b last:border-none py-2">
													{issue.summary}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
