import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/repos/Syndrect/zyra', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Zyra-App',
      },
      // Cache for 5 minutes
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.subscribers_count,
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    
    // Return fallback data in case of error
    return NextResponse.json({
      stars: 100,
      forks: 200,
      watchers: 5000,
    });
  }
}
