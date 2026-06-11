export interface Movie {
  id: number;               
  title: string;            
  overview: string;         
  poster_path: string;      
  backdrop_path: string;    
  vote_average: number;     
  release_date: string;     
  genre_ids: number[];      
}


export interface MovieResponse {
  page: number;             
  results: Movie[];         
  total_pages: number;      
  total_results: number;    
}

export interface MovieDetail extends Movie {
  runtime: number;          
  genres: Genre[];          
  budget: number;           
  revenue: number;          
  tagline: string;          
  original_language: string; 
}

export interface Genre{
    id: number;
    name: string;
}
 export interface CastMember{
    id: number;
    name: string;
    character: string;
     profile_path: string | null;
}

export interface CrewMember{
    id: number;
    name: string;
    job: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}