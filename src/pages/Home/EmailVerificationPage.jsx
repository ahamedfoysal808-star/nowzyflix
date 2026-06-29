import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { applyActionCode } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { BiMoviePlay } from 'react-icons/bi';
import SEO from './SEO';

export default function EmailVerificationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    const mode = queryParams.get('mode');

    if (!oobCode || mode !== 'verifyEmail') {
      setError('Invalid or missing verification token. Make sure you used the exact link from your email.');
      setLoading(false);
      return;
    }

    const processVerification = async () => {
      try {
        // 1. Actually verify the email token with Firebase
        await applyActionCode(auth, oobCode);

        // 2. Wait for Firebase to finish resolving the local session.
        await auth.authStateReady();

        // 3. Update local session and write state parameters cleanly to Firestore database collections
        if (auth.currentUser) {
          await auth.currentUser.reload();
          const u = auth.currentUser;
          if (u.emailVerified) {
            const ref = doc(db, 'users', u.uid);
            await setDoc(ref, { emailVerified: true }, { merge: true });
          }
        }

        setSuccess(true);
      } catch (err) {
        setError('The verification link is invalid or has expired.');
      } finally {
        setLoading(false);
      }
    };

    processVerification();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-[#07080a] flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <SEO title="Verify Email — NowzyFlix" noSuffix />
      
      <div className="w-full max-w-[400px] bg-[#0b0f19]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black p-8 text-center">
        {/* Brand Header Display Wrapper Panel */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center">
            <BiMoviePlay className="text-cyan-400 text-2xl" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            Nowzy<span className="text-cyan-400">Flix</span>
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <FaSpinner className="text-cyan-400 animate-spin text-4xl" />
            <p className="text-gray-400 font-medium mt-2">Verifying your email...</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-xl font-bold text-white">Email Verified!</h2>
            <p className="text-gray-400 text-sm mb-4">
              Your email address has been successfully verified. Your account is now fully active.
            </p>
            <Link
              to="/"
              className="w-full py-3.5 flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all"
            >
              Go to Homepage
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
              <FaExclamationCircle className="text-red-500 text-4xl" />
            </div>
            <h2 className="text-xl font-bold text-white">Verification Failed</h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {error}
            </p>
            <Link
              to="/"
              className="w-full py-3.5 flex justify-center items-center bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
            >
              Back to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
